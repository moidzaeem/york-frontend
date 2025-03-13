const TextArea = ({ disabled = false, value="", className, children, ...props }) => (
    <textarea
        disabled={disabled}
        value={value}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
        {...props}
    />
)

export default TextArea;
