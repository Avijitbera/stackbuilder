import React from "react";
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    backgroundColor?: string;
    shadow?: string;
  }

  const Card: React.FC<CardProps> = ({
    children,
    backgroundColor = "white",
    shadow = "md",
    className = "",
    ...props
  }) => {
    return (
      <div
        className={`bg-${backgroundColor} rounded-lg shadow-${shadow} p-4 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export default Card;
