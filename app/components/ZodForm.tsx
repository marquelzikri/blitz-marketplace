import { CSSProperties } from "react"
import {
  z,
  ZodArray,
  ZodBigInt,
  ZodDate,
  ZodNonEmptyArray,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodString,
} from "zod"
import { FieldArray } from "react-final-form-arrays"

import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"

export { FORM_ERROR } from "app/core/components/Form"

export function ZodForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const { schema } = props

  const iterateSchema = (schema: any, parentField?: string) =>
    Object.keys(schema["shape"]).map((fieldName) => renderField(schema, fieldName, parentField))

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

  const renderInputField = (
    fieldName: string,
    type: "number" | "text" | "email" | "password" | undefined,
    fieldLabel: string,
    parentField?: string
  ) => {
    const visibilityStyle: CSSProperties = {
      visibility: "hidden",
      position: "absolute",
    }

    return (
      <LabeledTextField
        key={fieldName}
        type={type}
        name={parentField ? `${parentField}.${fieldName}` : fieldName}
        label={fieldLabel}
        placeholder={fieldLabel}
        // outerProps={{ style: { ...(fieldName === "id" ? visibilityStyle : {}) } }}
      />
    )
  }

  const renderField = (schema: any, fieldName: string, parentField?: string) => {
    const field = schema["shape"][fieldName]
    if (field == null) return null

    let fieldLabel = fieldName.replace(/([A-Z])/g, " $1")
    fieldLabel = fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1)

    const type = getFieldType(field)
    if (type === "array") {
      return (
        <FieldArray key="fieldName" name={fieldName}>
          {({ fields }) => (
            <div>
              <div className="flex justify-center">
                <span>{fieldLabel}</span>
              </div>
              <hr />
              {fields.map((name, index) => (
                <div key={name}>
                  {iterateSchema(field?._def?.type, name)}
                  <button type="button" onClick={() => fields.remove(index)}>
                    Remove {fieldLabel}
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => fields.push({})}>
                Add {fieldLabel}
              </button>
            </div>
          )}
        </FieldArray>
      )
    }

    return renderInputField(fieldName, type, fieldLabel, parentField)
  }

  return <Form<S> {...props}>{schema ? iterateSchema(schema) : null}</Form>
}
