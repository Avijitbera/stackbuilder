import React from 'react'
import { useBuilder } from '../../context/BuilderContext'
import ColorPicker from '../../controls/ColorPicker';
import Select from '../../controls/Select';

const ComponentEditor = () => {
    const {selectedComponent, updateComponentProps,selectedIndex } = useBuilder()
    if (!selectedComponent) {
        return <div className="text-gray-500">Select a component to edit.</div>;
    }

    return(
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Edit Component</h2>
            {selectedComponent.type === "button" && (
                <>
                <ColorPicker
            label="Background Color"
            value={selectedComponent.props.backgroundColor || "blue-500"}
            onChange={(value) =>
              updateComponentProps(selectedIndex!, { backgroundColor: value })
            }
          />
          <ColorPicker
            label="Text Color"
            value={selectedComponent.props.color || "white"}
            onChange={(value) => updateComponentProps(selectedIndex!, { color: value })}
          />

          <Select
          label='Variant'
          value={selectedComponent.props.variant || "contained"}
          options={[
              {value:"primary", label:"Primary"},
              {value:'secondary', label:'Secondary'},
              {value:'danger', label:'Danger'},
          ]}
          onChange={(value) => updateComponentProps(selectedIndex!, {variant: value })}
          />
                </>
            )}

{selectedComponent.type === "input" && (
        <ColorPicker
          label="Border Color"
          value={selectedComponent.props.borderColor || "gray-300"}
          onChange={(value) => updateComponentProps(selectedIndex!, { borderColor: value })}
        />
      )}
      {selectedComponent.type === "card" && (
        <>
          <ColorPicker
            label="Background Color"
            value={selectedComponent.props.backgroundColor || "white"}
            onChange={(value) =>
              updateComponentProps(selectedIndex!, { backgroundColor: value })
            }
          />
          <Select
            label="Shadow"
            value={selectedComponent.props.shadow || "md"}
            options={[
              { value: "sm", label: "Small" },
              { value: "md", label: "Medium" },
              { value: "lg", label: "Large" },
            ]}
            onChange={(value) => updateComponentProps(selectedIndex!, { shadow: value })}
          />
        </>
      )}
        </div>
    )
}
export default ComponentEditor