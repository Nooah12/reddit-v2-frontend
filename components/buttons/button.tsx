import React from "react";

type RedditButtonProps = {
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button = ({ 
  className = "",
  variant = "primary",
  type = "button",
  children, 
  onClick 
}: RedditButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full text-xs px-4 py-2 transition-colors duration-200 
        ${variant === "primary"
          ? "bg-orange-500 text-white hover:bg-orange-600"
          : "bg-blue-500 text-white hover:bg-blue-600"}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
