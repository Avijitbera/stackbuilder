import { useState } from "react";


interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
  }

  const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) =>{
    const [customColor, setCustomColor] = useState("");

    const colors = [
        "red-500",
        "blue-500",
        "green-500",
        "yellow-500",
        "purple-500",
        "pink-500",
        "gray-500",
        "black",
        "white",
      ];

      return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
                <button
                    key={color}
                    className={`w-6 h-6 rounded-full border-2 ${
                    value === color ? "border-blue-500" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color === "black" ? "#000" : color === "white" ? "#fff" : `var(--${color})` }}
                    onClick={() => onChange(color)}
                />
                ))}


            </div>

            <div className="flex items-center gap-2">
                <input
                type="color"
                value={customColor}
                onChange={(e) => {
                    setCustomColor(e.target.value);
                    onChange(e.target.value);
                }}
                className="w-10 h-10"
                />

                <input
                        type="text"
                        value={customColor}
                        onChange={(e) => {
                            setCustomColor(e.target.value);
                            onChange(e.target.value);
                        }}
                        placeholder="Custom color"
                        className="w-full px-3 py-2 border rounded-md"
                        />
            </div>
        </div>
      )
  }
  export default ColorPicker