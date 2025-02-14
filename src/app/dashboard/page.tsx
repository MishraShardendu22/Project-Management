/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFetchProjects, useCreateProject, useDeleteProject } from "@/util/API";
import { useFetchCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/util/API";

export default function Dashboard() {
  const { data: categories, isFetching: categoriesLoading } = useFetchCategories();
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const { data: projects, isFetching: projectsLoading } = useFetchProjects();
  const [editCategoryName, setEditCategoryName] = useState("");
  const { mutate: createProject } = useCreateProject();
  
  // Store categoryId as a number (or null when not selected)
  const [newProject, setNewProject] = useState<{
    name: string;
    description: string;
    dueDate: string;
    categoryId: number | null;
  }>({
    name: "",
    description: "",
    dueDate: "",
    categoryId: null,
  });
  
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: deleteProject } = useDeleteProject();
  const [newCategory, setNewCategory] = useState("");

  const handleCategoryCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim() === "") {
      alert("Category name is required.");
      return;
    }
    createCategory({ name: newCategory });
    setNewCategory("");
  };

  const handleCategoryUpdate = (cat: any) => {
    if (editCategoryName.trim() === "") {
      alert("Category name is required.");
      return;
    }
    updateCategory({ categoryId: cat.id.toString(), name: editCategoryName });
    setEditingCategory(null);
    setEditCategoryName("");
  };

  const handleCategoryDelete = (catId: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(catId.toString());
    }
  };

  const groupedProjects = useMemo(() => {
    const groups: Record<string, any[]> = {};
    if (projects) {
      projects.forEach((project: any) => {
        const catKey = project.categoryId ? project.categoryId.toString() : "uncategorized";
        if (!groups[catKey]) groups[catKey] = [];
        groups[catKey].push(project);
      });
    }
    return groups;
  }, [projects]);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("The categoryId is:", newProject.categoryId);
    if (!newProject.name) {
      alert("Project name is required.");
      return;
    }
    const projectPayload: any = { ...newProject };
    if (newProject.categoryId !== null) {
      projectPayload.categoryId = newProject.categoryId;
    } else {
      delete projectPayload.categoryId;
    }
    createProject(projectPayload, {
      onSuccess: () => {
        setNewProject({
          name: "",
          description: "",
          dueDate: "",
          categoryId: null,
        });
      },
    });
  };

  const handleDeleteProject = (projectId: string) => {
    try {
      deleteProject(projectId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <div className="mb-8 border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Manage Categories</h2>
        <form onSubmit={handleCategoryCreate} className="flex gap-2 mb-4">
          <Input 
            placeholder="New Category Name" 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)} 
          />
          <Button type="submit">Add Category</Button>
        </form>
        {categoriesLoading ? (
          <p>Loading categories...</p>
        ) : (
          <ul className="space-y-2">
            {categories?.map((cat: any) => (
              <li key={cat.id} className="flex items-center gap-2">
                {editingCategory === cat.id ? (
                  <>
                    <Input 
                      value={editCategoryName} 
                      onChange={(e) => setEditCategoryName(e.target.value)} 
                    />
                    <Button onClick={() => handleCategoryUpdate(cat)}>Save</Button>
                    <Button 
                      onClick={() => setEditingCategory(null)} 
                      variant="destructive"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <span>{cat.name}</span>
                    <Button
                      onClick={() => {
                        setEditingCategory(cat.id);
                        setEditCategoryName(cat.name);
                      }}
                      variant="outline"
                    >
                      Edit
                    </Button>
                    <Button 
                      onClick={() => handleCategoryDelete(cat.id)} 
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="mb-6 border p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Create New Project</h2>
        <form onSubmit={handleCreateProject} className="flex flex-col gap-2">
          <Input 
            placeholder="Project Name" 
            value={newProject.name} 
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} 
          />
          <Input 
            placeholder="Description" 
            value={newProject.description} 
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} 
          />
          <Input
            type="date" 
            value={newProject.dueDate} 
            onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })} 
          />
          <select
            className="border p-2"
            value={newProject.categoryId !== null ? newProject.categoryId.toString() : ""}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                categoryId: e.target.value ? parseInt(e.target.value) : null,
              })
            }
          >
            <option value="">Select Category (optional)</option>
            {categories &&
              categories.map((cat: any) => (
                <option key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </option>
              ))}
          </select>
          <Button type="submit">Create Project</Button>
        </form>
      </div>
      
      {projectsLoading || categoriesLoading ? (
        <p>Loading projects...</p>
      ) : (
        Object.keys(groupedProjects).map((catKey) => {
          const category =
            catKey === "uncategorized"
              ? { name: "Uncategorized" }
              : categories.find((cat: any) => cat.id.toString() === catKey) || { name: "Unknown Category" };
          return (
            <div key={catKey} className="mb-8">
              <h2 className="text-xl font-bold mb-2">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedProjects[catKey].map((project: any) => (
                  <div
                    key={project.id}
                    className="border p-4 rounded shadow hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p>{project.description}</p>
                    <p className="text-sm text-gray-500">Due: {project.dueDate}</p>
                    <Link href={`/dashboard/projects/${project.id}`}>
                      <Button className="mt-2">View Tasks</Button>
                    </Link>
                    <Button
                      onClick={() => {
                        if (
                          window.confirm("Are you sure you want to delete this project?")
                        ) {
                          handleDeleteProject(project.id.toString());
                        }
                      }}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}