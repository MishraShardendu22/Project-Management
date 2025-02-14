/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFetchTasks, useCreateTask, useUpdateTask, useDeleteTask } from "@/util/API";

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params.projectId;
  const { deleteTask } = useDeleteTask();
  const { updateTask, isPending: isUpdating } = useUpdateTask();
  const { data: tasks, isPending, isError, error } = useFetchTasks();
  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: 1,
    projectId: projectId,
  });
  const [editingTask, setEditingTask] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      alert("Please fill all required fields.");
      return;
    }
    createTask(newTask, {
      onSuccess: () =>
        setNewTask({
          title: "",
          description: "",
          dueDate: "",
          priority: 1,
          projectId: projectId,
        }),
    });
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    if (!editForm.title || !editForm.description || !editForm.dueDate) {
      alert("Please fill all fields.");
      return;
    }
    updateTask(editingTask.id.toString(), editForm);
    setEditingTask(null);
    setEditForm({ title: "", description: "", dueDate: "" });
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
    }
  };

  const filteredTasks = tasks && projectId ? tasks.filter((task: any) => task.projectId.toString() === projectId.toString()) : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Tasks</h1>
      {isPending && <p>Loading tasks...</p>}
      {isError && <p>Error fetching tasks: {error?.message}</p>}
      <div>
        {filteredTasks && filteredTasks.length > 0 ? (
          <ul className="space-y-4">
            {filteredTasks.map((task: any) => (
              <li key={task.id} className="border p-4 rounded">
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p>{task.description}</p>
                <p className="text-sm text-gray-500">Due Date: {task.dueDate}</p>
                <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() => {
                      setEditingTask(task);
                      setEditForm({
                        title: task.title,
                        description: task.description,
                        dueDate: task.dueDate,
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteTask(task.id.toString())} variant="destructive">
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
      {editingTask && (
        <div className="mt-6 border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Edit Task</h2>
          <form onSubmit={handleUpdateTask} className="flex flex-col gap-2">
            <Input placeholder="Title" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
            <Input placeholder="Description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
            <Input type="date" value={editForm.dueDate} onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })} />
            <div className="flex gap-2">
              <Button type="submit" disabled={isUpdating}>
                Update Task
              </Button>
              <Button onClick={() => setEditingTask(null)} variant="destructive">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      <div className="mt-6 border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Create New Task</h2>
        <form onSubmit={handleCreateTask} className="flex flex-col gap-2">
          <Input placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
          <Input placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
          <Input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
          <Input type="number" placeholder="Priority" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: parseInt(e.target.value) })} />
          <Button type="submit" disabled={isCreating}>
            Create Task
          </Button>
        </form>
      </div>
    </div>
  );
}
