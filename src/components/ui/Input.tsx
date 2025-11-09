interface InputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-gray-900 text-gray-100 border-b-2 border-teal-500 p-3 rounded-t-lg outline-none transition duration-200 
                 focus:border-orange-500 focus:shadow-md focus:shadow-orange-800/50 ${
                   className || ""
                 }`}
      required
    />
  );
};

export default Input;
