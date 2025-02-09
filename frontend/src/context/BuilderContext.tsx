import { useState } from "react";
import { createContext } from "vm";

interface Component {
    type: string;
    content: string;
    props?:any;
}

interface BuilderContextType {
    components: Component[];
    selectedComponent: Component | null;
    addComponent: (type: string) => void;
    updateComponentContent: (index: number, content: string) => void;
    updateComponentProps: (index: number, props: any) => void;
    selectComponent: (index: number) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [components, setComponents] = useState<Component[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const addComponent = (type: string) => {
        const newComponent = { type, content: "", props: {} };
        setComponents([...components, newComponent]);
      };

      const updateComponentProps = (index: number, props: any) => {
        const updatedComponents = [...components];
        updatedComponents[index].props = { ...updatedComponents[index].props, ...props };
        setComponents(updatedComponents);
      };
    
      const selectComponent = (index: number) => {
        setSelectedIndex(index);
      };
}