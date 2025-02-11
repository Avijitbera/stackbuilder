import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
    color?: string;
    backgroundColor?: string;
  }

  
  const Button: React.FC<ButtonProps> = ({
    children,
  variant = "primary",
  size = "md",
  color = "white",
  backgroundColor = "blue-500",
  className = "",
  ...props
  }) =>{
    const variantClasses = {
        primary: `bg-${backgroundColor} hover:bg-${backgroundColor.replace("500", "600")} text-${color}`,
        secondary: `bg-gray-500 hover:bg-gray-600 text-${color}`,
        danger: `bg-red-500 hover:bg-red-600 text-${color}`,
      };
    
      const sizeClasses = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      };
      return (
        <button
          className={`rounded-md transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
          {...props}
        >
          {children}
        </button>
      );
  }

  export default Button
