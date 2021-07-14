import { CSSProperties, DetailedHTMLProps, OptionHTMLAttributes } from "react"
import {
  ZodArray,
  ZodBigInt,
  ZodDate,
  ZodNonEmptyArray,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodRawShape,
  ZodString,
  ZodType,
} from "zod"
import { FieldArray } from "react-final-form-arrays"

import { Form, FormProps } from "app/core/components/Form"
import { LabeledSelectField } from "app/core/components/LabeledSelectField"
import { LabeledTextField } from "app/core/components/LabeledTextField"

/**
 * Flatten an object keys
 * @param obj - Object to flatten
 * @param prefix - Parent key
 * @param res
 */
const flattenObject = (obj: any, prefix: string = "", res: any = {}) =>
  Object.entries(obj || {}).reduce((r, [key, val]) => {
    const k = `${prefix}${key}`

    if (typeof val === "object") {
      if (typeof Object.values(val || {})[0] === "object") flattenObject(val, `${k}.`, r)
      else res[k] = val
    } else {
      res[k] = val
    }
    return r
  }, res)

export { FORM_ERROR } from "app/core/components/Form"

export type Field = {
  name: string
  label: string
  type: string
  parent: any
  def: any
  hidden?: boolean
  options?: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>[]
  render?: JSX.Element
}

export interface ZodFormOption {
  [key: string]: any
}

export function ZodForm<S extends ZodType<any, any>>(
  props: FormProps<S> & { options?: ZodFormOption }
) {
  const { children, schema } = props
  const options = flattenObject(props.options)

  const getFieldType = (obj: any) => {
    switch (obj?.constructor) {
      case ZodDate:
      case ZodString:
        return "text"
      case ZodBigInt:
      case ZodNumber:
        return "number"
      // case ZodDate:
      //   return "date"
      case ZodNonEmptyArray:
      case ZodArray:
        return "array"
      case ZodObject:
      case ZodOptional:
        return getFieldType(obj?._def?.innerType)
      default:
        break
    }
  }

  /**
   * Parse zod object to field array
   * @param schema - Zod schema(object)
   * @param parentField - Used for zod array type
   */
  const parseZodObject = (schema: ZodObject<ZodRawShape>, parentField?: string) => {
    if (!schema) return []
    return Object.keys(schema["shape"]).map((fieldName) => {
      const field = schema["shape"][fieldName]
      if (field == null) return null

      let fieldLabel = fieldName.replace(/([A-Z])/g, " $1")
      fieldLabel = fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1)

      const type = getFieldType(field)
      let parsedField: Field = {
        type,
        name: fieldName,
        label: fieldLabel,
        parent: parentField,
        def: field?._def,
      }
      if (Object.keys(options).includes(fieldName))
        parsedField = { ...parsedField, ...options[fieldName] }
      if (type === "array") parsedField["items"] = parseZodObject(field?._def?.type, fieldName)

      return parsedField
    })
  }

  const renderField = ({ name, label, type, parent, def, hidden, options, render }: Field) => {
    const hiddenStyle: CSSProperties = {
      visibility: "hidden",
      position: "absolute",
    }

    if (render) return render

    if (type === "array") {
      return (
        <FieldArray key={name} name={name}>
          {({ fields }) => (
            <div>
              <div className="flex justify-center">
                <span>{label}</span>
              </div>
              <hr />
              {fields.map((name, index) => (
                <div key={name}>
                  {parseZodObject(def?.type, name).map((field) => renderField(field as any))}
                  <button type="button" onClick={() => fields.remove(index)}>
                    Remove {label}
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => fields.push({})}>
                Add {label}
              </button>
            </div>
          )}
        </FieldArray>
      )
    }

    if (type === "select") {
      return (
        <LabeledSelectField
          key={name}
          type={options ? (typeof options[0]?.value === "string" ? "text" : "number") : "text"}
          name={parent ? `${parent}.${name}` : name}
          label={label}
          options={options || []}
        />
      )
    }

    if (["number", "text", "password", "email"].includes(type)) {
      return (
        <LabeledTextField
          key={name}
          type={type as "number" | "text" | "password" | "email"}
          name={parent ? `${parent}.${name}` : name}
          label={label}
          placeholder={label}
          outerProps={{ style: { ...(hidden ? hiddenStyle : {}) } }}
        />
      )
    }
  }

  const fields = parseZodObject(schema as unknown as ZodObject<ZodRawShape>)

  return (
    <Form<S> {...props}>
      {fields ? fields.map((field) => renderField(field as any)) : null}
      {children}
    </Form>
  )
}
