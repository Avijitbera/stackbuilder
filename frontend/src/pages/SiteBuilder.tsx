import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { BuilderProvider, useBuilder } from "../context/BuilderContext";


const SiteBuilder = () =>{
    const {projectId} = useParams()
    const navigate = useNavigate();
    const {token} = useAuth()
    const [components, setComponents] = useState<Array<{ type: string; content: string }>>([]);
    const { colors, theme } = useTheme();

    const {selectedIndex, selectComponent} = useBuilder()
    
    // const createNewProject = async () => {
    //     try {
    //       const response = await fetch("/api/projects/create", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${token}`
    //          },
    //         body: JSON.stringify({ name: "New Project" }), // Default project name
    //       });
    
    //       const data = await response.json();
    //       if (response.ok) {
    //         navigate(`/projects/${data.project.id}`); // Redirect to the new project
    //       } else {
    //         alert("Failed to create project.");
    //       }
    //     } catch (error) {
    //       console.error("Error creating project:", error);
    //     }
    //   };

    //   const loadProject = async () => {
    //     try {
    //       const response = await fetch(`/api/projects/get?projectId=${projectId}`);
    //       const data = await response.json();
    
    //       if (response.ok && data.project) {
    //         setComponents(JSON.parse(data.project.data));
    //       } else {
    //         alert("Failed to load project.");
    //       }
    //     } catch (error) {
    //       console.error("Error loading project:", error);
    //     }
    //   };
    //   const saveProject = async () => {
    //     try {
    //       const response = await fetch("/api/projects/update", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ projectId, data: JSON.stringify(components) }),
    //       });
    
    //       if (!response.ok) {
    //         alert("Failed to save project.");
    //       }
    //     } catch (error) {
    //       console.error("Error saving project:", error);
    //     }
    //   };

    //   useEffect(() => {
    //     if (projectId) {
    //       loadProject();
    //     } else {
    //       createNewProject(); // Create a new project if no projectId is provided
    //     }
    //   }, [projectId]);

    //   useEffect(() => {
    //     if (projectId) {
    //       const autoSave = setTimeout(() => {
    //         saveProject();
    //       }, 5000); // Auto-save every 5 seconds
    
    //       return () => clearTimeout(autoSave);
    //     }
    //   }, [components, projectId]);

      const updateComponentContent = (index: number, content: string) => {
        const updatedComponents = [...components];
        updatedComponents[index].content = content;
        setComponents(updatedComponents);
      };

      const addComponent = (type: string) => {
        const newComponent = { type, content: "" };
        setComponents([...components, newComponent]);
      };
    
    return (
        <BuilderProvider>
          <div className="min-h-screen bg-gray-100 p-6">
          <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Static Site Builder</h1>
        <ThemeToggle />
        {/* <button
            onClick={saveProject}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
          >
            Save Progress
          </button> */}
      </div>
      <div className="flex gap-6">
      <div
          className="w-1/4 p-4 rounded-lg shadow-md"
          style={{ backgroundColor: colors.card }}
        >
          <h2 className="text-xl font-semibold mb-4">Components</h2>
          <button
            onClick={() => addComponent("text")}
            className="w-full py-2 rounded-lg mb-2"
            style={{ backgroundColor: colors.primary, color: "white" }}
          >
            Add Text
          </button>
          <button
            onClick={() => addComponent("image")}
            className="w-full py-2 rounded-lg"
            style={{ backgroundColor: colors.primary, color: "white" }}
          >
            Add Image
          </button>
        </div>
        <div
          className="w-3/4 p-6 rounded-lg shadow-md"
          style={{ backgroundColor: colors.card }}
        >
          <h2 className="text-xl font-semibold mb-4">Canvas</h2>
          {components.length === 0 ? (
            <p>No components added yet. Start by adding a component from the sidebar.</p>
          ) : (
            components.map((component, index) => (
              <div key={index} className="mb-4">
                {component.type === "text" ? (
                  <textarea
                    value={component.content}
                    onChange={(e) => updateComponentContent(index, e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    style={{ backgroundColor: colors.card, color: colors.text }}
                    placeholder="Enter text here..."
                  />
                ) : component.type === "image" ? (
                  <input
                    type="text"
                    value={component.content}
                    onChange={(e) => updateComponentContent(index, e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    style={{ backgroundColor: colors.card, color: colors.text }}
                    placeholder="Enter image URL here..."
                  />
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
          
        </div>
        </BuilderProvider>
    )
}

export default SiteBuilder