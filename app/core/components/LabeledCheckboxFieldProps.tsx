import React, { ComponentPropsWithoutRef, ReactNode } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import classnames from "classnames"

export interface LabeledCheckboxFieldProps extends ComponentPropsWithoutRef<"input"> {
  /** Field name. */
  name: string
  /** Field label. */
  label: ReactNode
  outerProps?: ComponentPropsWithoutRef<"div">
  fieldProps?: UseFieldConfig<string>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledCheckboxField = React.forwardRef<HTMLInputElement, LabeledCheckboxFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, className, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      type: "checkbox",
      ...fieldProps,
    })
    const id = new Date().toString() + Math.random()

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const showError = touched && normalizedError

    return (
      <div {...outerProps}>
        <div className="flex space-x-2 text-sm">
          <div className="h-5">
            <input
              id={id}
              key={id}
              disabled={submitting}
              ref={ref}
              {...input}
              {...props}
              className={classnames(
                "h-4 w-4 text-indigo-600 rounded-sm shadow-sm",
                showError
                  ? "focus:ring-red-500 focus:border-red-500 border-red-300"
                  : "focus:ring-primary-500 focus:border-primary-500 border-gray-300",
                className
              )}
            />
          </div>
          <label
            htmlFor={id}
            {...labelProps}
            className={classnames(
              "mt-px select-none",
              showError ? "text-red-700" : "text-gray-700",
              labelProps?.className
            )}
          >
            {label}
            <div role="alert" className="mt-1 text-sm font-bold text-red-700">
              {showError && normalizedError}
            </div>
          </label>
        </div>
      </div>
    )
  }
)
