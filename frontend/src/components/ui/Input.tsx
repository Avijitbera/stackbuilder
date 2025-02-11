import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    borderColor?: string;
}
const Input: React.FC<InputProps> = ({ borderColor = "gray-300", className = "", ...props }) => {
    return (
      <input
        className={`w-full px-3 py-2 border border-${borderColor} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    );
  };
  
  export default Input;