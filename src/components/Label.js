const Label = ({ className, children, ...props }) => (
    <label
        className={`${className} flex items-center justify-start gap-2 font-medium text-base text-gray-700`}
        {...props}>
        {children}
    </label>
)

export default Label
