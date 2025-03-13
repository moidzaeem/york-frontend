const InputRadio = ({ disabled = false, checked = false, className, ...props }) => (
    <input
        type="radio"
        disabled={disabled}
        checked={checked}
        className={`${className} rounded-full shadow-sm border-gray-300 focus:ring-0 focus:border-0 size-5`}
        {...props}
    />
)

export default InputRadio
