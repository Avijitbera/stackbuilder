import React from "react";

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
}

const Grid: React.FC<GridProps> = ({
    children, columns = 2, gap = 4, className = ""
}) =>{
    return(
        <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap * 0.25}rem`, // Convert gap to rem (Tailwind uses 0.25rem increments)
      }}
    >
      {children}
    </div>
    )
}

export default Grid