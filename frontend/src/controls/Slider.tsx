import React from "react";

interface SliderProps {
    label: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: number) => void;
  }
  
  const Slider: React.FC<SliderProps> = ({
    label,
    onChange,
    value,
    min = 0,
    max = 100,
    step = 1
  }) =>{
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="flex items-center gap-4">
            <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
        />
        <span className="text-sm text-gray-600">{value}</span>
            </div>
        </div>
    )
  }

  export default Slider
