import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function ZodForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const { schema } = props
  return (
    <Form<S> {...props}>
      {schema
        ? Object.keys(schema["shape"]).map((fieldName) => {
            const field = schema["shape"][fieldName]
            if (field == null) return null

            let fieldLabel = fieldName.replace(/([A-Z])/g, " $1")
            fieldLabel = fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1)

            const fieldType = field?.__proto__?.constructor?.name
            let type: "number" | "text" | "email" | "password" | undefined = "text"
            if (fieldType === "ZodNumber") type = "number"

            return (
              <LabeledTextField
                key={fieldName}
                type={type}
                name={fieldName}
                label={fieldLabel}
                placeholder={fieldLabel}
              />
            )
          })
        : null}
    </Form>
  )
}
