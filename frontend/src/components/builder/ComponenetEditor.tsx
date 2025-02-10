import React from 'react'
import { useBuilder } from '../../context/BuilderContext'
const ComponentEditor = () => {
    const {selectedComponent, updateComponentProps} = useBuilder()
    if (!selectedComponent) {
        return <div className="text-gray-500">Select a component to edit.</div>;
    }

    return(
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Edit Component</h2>
            
        </div>
    )
}
export default ComponentEditor