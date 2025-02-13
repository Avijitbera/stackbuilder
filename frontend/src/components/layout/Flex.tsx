import React from "react";

interface FlexProps {
  children: React.ReactNode;
  direction?: "row" | "col";
  gap?: number;
  className?: string;
}

const Flex: React.FC<FlexProps> = ({ children, direction = "row", gap = 4, className = "" }) => {
    return (
      <div
        className={`flex ${direction === "row" ? "flex-row" : "flex-col"} ${className}`}
        style={{ gap: `${gap * 0.25}rem` }} // Convert gap to rem
      >
        {children}
      </div>
    );
  };
  
  export default Flex;

