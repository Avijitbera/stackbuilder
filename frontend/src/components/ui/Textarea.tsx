import React from "react";
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    borderColor?: string;
  }

  const Textarea: React.FC<TextareaProps> = ({ borderColor = "gray-300", className = "", ...props }) => {
    return (
      <textarea
        className={`w-full px-3 py-2 border border-${borderColor} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    );
  };
  
  export default Textarea;
