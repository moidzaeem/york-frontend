const InputCheckbox = ({ disabled = false, checked = false, className, ...props }) => (
    <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:ring-0 focus:border-0 size-5`}
        {...props}
    />
)

export default InputCheckbox
