import React, { DetailedHTMLProps, OptionHTMLAttributes, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import classnames from "classnames"

export interface LabeledSelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  options: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>[]
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  fieldProps?: UseFieldConfig<string>
}

export const LabeledSelectField = React.forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  ({ children, name, label, options, fieldProps, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      ...((props.type === "number"
        ? { parse: (v: string) => Number(v) }
        : {
            parse: (v: string) => (v === "" ? null : v),
          }) as any),
      ...fieldProps,
    })
    const id = new Date().toString() + Math.random()

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const showError = touched && normalizedError

    return (
      <div {...outerProps}>
        <div className="flex justify-between text-sm font-medium leading-5">
          <label htmlFor={id} className="text-gray-700">
            {label}
          </label>
        </div>
        <select
          id={id}
          key={id}
          {...input}
          disabled={submitting}
          {...props}
          ref={ref}
          className={classnames(
            "mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none  sm:text-sm rounded-md shadow-sm border",
            showError
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-purple-500 focus:ring-primary-500 focus:border-primary-500"
          )}
        >
          {children
            ? children
            : options.map(({ label, value }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
        </select>
        <div role="alert" className="ml-1 text-xs text-right text-red-700">
          {showError && normalizedError}
        </div>
      </div>
    )
  }
)
