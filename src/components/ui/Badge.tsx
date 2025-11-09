import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  status?: "pending" | "completed" | "other";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, status, className }) => {
  return (
    <span
      className={` px-3 py-1 text-xs font-semibold uppercase rounded-full ${
        className || ""
      }`}
    >
      {children}
    </span>
  );
};

export default Badge;
