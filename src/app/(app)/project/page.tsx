/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateProject, useDeleteProject, useFetchProjects, useUpdateProject } from "@/util/API";
import { useState } from "react";

export default function ProjectManagement() {
    const { data: projects, isFetching } = useFetchProjects();
    const { mutate: createProject } = useCreateProject();
    const { mutate: updateProject } = useUpdateProject();
    const { mutate: deleteProject } = useDeleteProject();
    
    const [newProject, setNewProject] = useState({ name: "", description: "", dueDate: "" });

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Project Management</h1>
            <div className="flex gap-2 mb-4">
                <Input placeholder="Project Name" value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} />
                <Input placeholder="Description" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
                <Input type="date" value={newProject.dueDate} onChange={e => setNewProject({ ...newProject, dueDate: e.target.value })} />
                <Button onClick={() => createProject(newProject)}>Create</Button>
            </div>
            {isFetching ? <p>Loading...</p> : 
                <ul className="space-y-2">
                    {projects?.map((project: any) => (
                        <li key={project.id} className="p-4 border rounded-md flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold">{project.name}</h2>
                                <p>{project.description}</p>
                                <p className="text-sm text-gray-500">Due: {project.dueDate}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={() => updateProject({ projectId: project.id, updates: { name: "Updated" } })}>Update</Button>
                                <Button onClick={() => deleteProject(project.id)} variant="destructive">Delete</Button>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}
