import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const SiteBuilder = () =>{
    const {projectId} = useParams()
    const navigate = useNavigate();
    const {token} = useAuth()

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
    return (
        <div className="min-h-screen bg-gray-100 p-6">

        </div>
    )
}

export default SiteBuilder