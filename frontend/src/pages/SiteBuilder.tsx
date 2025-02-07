import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";


const SiteBuilder = () =>{
    const {projectId} = useParams()
    const navigate = useNavigate();
    const {token} = useAuth()
    const [components, setComponents] = useState<Array<{ type: string; content: string }>>([]);

    const createNewProject = async () => {
        try {
          const response = await fetch("/api/projects/create", {
            method: "POST",
            headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
             },
            body: JSON.stringify({ name: "New Project" }), // Default project name
          });
    
          const data = await response.json();
          if (response.ok) {
            navigate(`/projects/${data.project.id}`); // Redirect to the new project
          } else {
            alert("Failed to create project.");
          }
        } catch (error) {
          console.error("Error creating project:", error);
        }
      };

      const loadProject = async () => {
        try {
          const response = await fetch(`/api/projects/get?projectId=${projectId}`);
          const data = await response.json();
    
          if (response.ok && data.project) {
            setComponents(JSON.parse(data.project.data));
          } else {
            alert("Failed to load project.");
          }
        } catch (error) {
          console.error("Error loading project:", error);
        }
      };
      const saveProject = async () => {
        try {
          const response = await fetch("/api/projects/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projectId, data: JSON.stringify(components) }),
          });
    
          if (!response.ok) {
            alert("Failed to save project.");
          }
        } catch (error) {
          console.error("Error saving project:", error);
        }
      };

      useEffect(() => {
        if (projectId) {
          loadProject();
        } else {
          createNewProject(); // Create a new project if no projectId is provided
        }
      }, [projectId]);

      useEffect(() => {
        if (projectId) {
          const autoSave = setTimeout(() => {
            saveProject();
          }, 5000); // Auto-save every 5 seconds
    
          return () => clearTimeout(autoSave);
        }
      }, [components, projectId]);
    
    return (
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Static Site Builder</h1>
        <ThemeToggle />
        <button
            onClick={saveProject}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
          >
            Save Progress
          </button>
      </div>
          
        </div>
    )
}

export default SiteBuilder