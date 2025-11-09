interface TextAreaProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  rows?: number;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  rows = 3,
  className,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full bg-gray-900 text-gray-300 border border-teal-500 p-3 rounded-lg outline-none transition duration-200 
                 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 resize-none ${
                   className || ""
                 }`}
    />
  );
};

export default TextArea;
