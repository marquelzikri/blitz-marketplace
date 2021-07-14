import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps}>
        <label className="flex flex-col justify-between text-sm font-medium leading-5">
          {label}
          <input
            className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-purple-500 rounded-md shadow-sm focus:outline-none sm:text-sm"
            {...input}
            disabled={submitting}
            {...props}
            ref={ref}
          />
        </label>

        {touched && normalizedError && (
          <div role="alert" className="ml-1 text-xs text-right text-red-700">
            {normalizedError}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextField
