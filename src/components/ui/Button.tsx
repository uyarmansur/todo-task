const Button = ({
  title,
  children,
  onClick,
}: {
  children?: React.ReactNode;
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <>
      <button
        onClick={onClick}
        type="submit"
        className="w-full bg-orange-600 text-white font-semibold tracking-wider uppercase py-3 rounded-lg 
                   hover:bg-orange-500 transition duration-300 transform hover:scale-[1.01] 
                   shadow-lg shadow-orange-700/50 cursor-pointer"
      >
        {children || title}
      </button>
    </>
  );
};

export default Button;
