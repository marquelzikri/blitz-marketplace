import { CSSProperties } from "react"
import { z, ZodArray, ZodBigInt, ZodDate, ZodNumber, ZodObject, ZodOptional, ZodString } from "zod"

import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"

export { FORM_ERROR } from "app/core/components/Form"

export function ZodForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const { schema } = props

  const iterateSchema = (schema: any) =>
    Object.keys(schema["shape"]).map((fieldName) => renderField(schema, fieldName))

  const getFieldType = (obj: any) => {
    console.log(obj)
    switch (obj?.constructor) {
      case ZodDate:
      case ZodString:
        return "text"
      case ZodBigInt:
      case ZodNumber:
        return "number"
      // case ZodDate:
      //   return "date"
      case ZodArray:
        return "array"
      case ZodObject:
      case ZodOptional:
        return getFieldType(obj?._def?.innerType)
      default:
        break
    }
  }

  const renderField = (schema: any, fieldName: string) => {
    const field = schema["shape"][fieldName]
    if (field == null) return null

    let fieldLabel = fieldName.replace(/([A-Z])/g, " $1")
    fieldLabel = fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1)

    const type = getFieldType(field)
    if (type === "array") {
      return iterateSchema(field?._def?.type)
    }

    const visibilityStyle: CSSProperties = {
      visibility: "hidden",
      position: "absolute",
    }

    return (
      <LabeledTextField
        key={fieldName}
        type={type}
        name={fieldName}
        label={fieldLabel}
        placeholder={fieldLabel}
        outerProps={{ style: { ...(fieldName === "id" ? visibilityStyle : {}) } }}
      />
    )
  }

  return <Form<S> {...props}>{schema ? iterateSchema(schema) : null}</Form>
}
