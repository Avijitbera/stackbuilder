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
        </div>
    )
}
export default ComponentEditor