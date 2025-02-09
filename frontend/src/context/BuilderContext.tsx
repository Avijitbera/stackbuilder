import { useState, createContext, useContext } from "react";


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

      const updateComponentContent = (index: number, content: string) => {
        const updatedComponents = [...components];
        updatedComponents[index].content = content;
        setComponents(updatedComponents);
      };

      return(
        <BuilderContext.Provider
        value={{
            components,
        selectedComponent: selectedIndex !== null ? components[selectedIndex] : null,
        addComponent,
        updateComponentContent,
        updateComponentProps,
        selectComponent,
        }}>
            {children}
        </BuilderContext.Provider>
      )
}

export const useBuilder = () =>{
    const context = useContext(BuilderContext);
    if (!context) {
        throw new Error("useBuilder must be used within a BuilderProvider");
      }
      return context;
}