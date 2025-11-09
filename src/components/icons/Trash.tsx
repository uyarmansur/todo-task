import { CiTrash } from "react-icons/ci";
import React from "react";

interface TrashIconProps {
  onClick: () => void;
  className?: string;
}

const TrashIcon: React.FC<TrashIconProps> = ({ onClick, className }) => {
  return (
    <CiTrash
      onClick={onClick}
      className={`cursor-pointer p-1 rounded-full text-red-400 hover:bg-red-700 hover:text-white transition duration-150 focus:outline-none text-3xl ${
        className || ""
      }`}
    />
  );
};

export default TrashIcon;
