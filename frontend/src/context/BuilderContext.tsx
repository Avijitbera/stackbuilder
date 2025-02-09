
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
