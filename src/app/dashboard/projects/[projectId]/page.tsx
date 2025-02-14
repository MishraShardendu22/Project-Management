/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@/components/ui/button';
import {
 useFetchTasks,
 useCreateTask,
 useUpdateTask,
 useDeleteTask,
} from '@/util/API';

export default function ProjectDetail() {
 const editorRef = useRef<any>(null);
 const params = useParams();
 const projectId = params.projectId;
 const { deleteTask } = useDeleteTask();
 const { updateTask, isPending: isUpdating } = useUpdateTask();
 const { data: tasks, isPending, isError, error } = useFetchTasks();
 const { mutate: createTask, isPending: isCreating } = useCreateTask();

 const [newTask, setNewTask] = useState({
  title: '',
  description: '',
  dueDate: '',
  priority: 1,
  projectId: projectId,
 });
 const [editingTask, setEditingTask] = useState<any>(null);
 const [editForm, setEditForm] = useState({
  title: '',
  description: '',
  dueDate: '',
  priority: 1,
 });
 const [modalTask, setModalTask] = useState<any>(null);

 const handleCreateTask = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newTask.title || !newTask.description || !newTask.dueDate) {
   alert('Please fill all required fields.');
   return;
  }
  createTask(newTask, {
   onSuccess: () =>
    setNewTask({
     title: '',
     description: '',
     dueDate: '',
     priority: 1,
     projectId: projectId,
    }),
  });
 };

 const handleUpdateTask = (e: React.FormEvent) => {
  e.preventDefault();
  if (!editingTask) return;
  if (!editForm.title || !editForm.description || !editForm.dueDate) {
   alert('Please fill all fields.');
   return;
  }
  updateTask(editingTask.id.toString(), editForm);
  setEditingTask(null);
  setEditForm({ title: '', description: '', dueDate: '', priority: 1 });
 };

 const handleDeleteTask = (taskId: string) => {
  if (window.confirm('Are you sure you want to delete this task?')) {
   deleteTask(taskId);
  }
 };

 const filteredTasks =
  tasks && projectId
   ? tasks.filter(
      (task: any) => task.projectId.toString() === projectId.toString()
     )
   : [];

 return (
  <div className="p-6">
   <h1 className="text-3xl font-bold mb-6">Project Tasks</h1>
   {isPending && <p>Loading tasks...</p>}
   {isError && (
    <p className="text-red-500">Error fetching tasks: {error?.message}</p>
   )}
   <div>
    {filteredTasks && filteredTasks.length > 0 ? (
     <ul className="space-y-4">
      {filteredTasks.map((task: any) => {
       const sanitizedDescription = DOMPurify.sanitize(task.description, {
        ALLOWED_TAGS: [],
       });
       const snippet =
        sanitizedDescription.length > 100
         ? sanitizedDescription.substring(0, 100) + '...'
         : sanitizedDescription;
       return (
        <li key={task.id} className="border p-4 rounded shadow-sm">
         <h2 className="text-xl font-semibold">{task.title}</h2>
         <div className="text-sm text-gray-700 mt-2">
          <p>{snippet}</p>
          {sanitizedDescription.length > 100 && (
           <Button
            onClick={() => setModalTask(task)}
            variant="link"
            className="mt-1"
           >
            View Description
           </Button>
          )}
         </div>
         <p className="text-sm text-gray-500 mt-2">Due Date: {task.dueDate}</p>
         <p className="text-sm text-gray-500">
          Priority:{' '}
          {task.priority === 1
           ? 'Very High'
           : task.priority === 2
             ? 'High'
             : 'Moderate'}
         </p>
         <div className="flex gap-2 mt-4">
          <Button
           onClick={() => {
            setEditingTask(task);
            setEditForm({
             title: task.title,
             description: sanitizedDescription,
             dueDate: task.dueDate,
             priority: task.priority,
            });
           }}
          >
           Edit
          </Button>
          <Button
           onClick={() => handleDeleteTask(task.id.toString())}
           variant="destructive"
          >
           Delete
          </Button>
         </div>
        </li>
       );
      })}
     </ul>
    ) : (
     <p>No tasks available.</p>
    )}
   </div>

   {editingTask && (
    <div className="mt-8 border p-6 rounded shadow-md">
     <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
     <form onSubmit={handleUpdateTask} className="flex flex-col gap-4">
      <Input
       placeholder="Title"
       value={editForm.title}
       onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
      />
      <Input
       placeholder="Description"
       value={editForm.description}
       onChange={(e) =>
        setEditForm({ ...editForm, description: e.target.value })
       }
      />
      <Input
       type="date"
       value={editForm.dueDate}
       onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
      />
      <div>
       <label className="block text-sm font-medium mb-1">Priority</label>
       <select
        className="w-full border-gray-300 rounded-md p-2"
        value={editForm.priority}
        onChange={(e) =>
         setEditForm({
          ...editForm,
          priority: parseInt(e.target.value),
         })
        }
       >
        <option value="1">1 (Very High)</option>
        <option value="2">2 (High)</option>
        <option value="3">3 (Moderate)</option>
       </select>
      </div>
      <div className="flex gap-4">
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

   <div className="mt-8 border p-6 rounded shadow-md">
    <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
    <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
     <Input
      placeholder="Title"
      value={newTask.title}
      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
     />
     <Editor
      value={newTask.description}
      onEditorChange={(content) =>
       setNewTask({ ...newTask, description: content })
      }
      apiKey={process.env.NEXT_PUBLIC_API_KEY}
      onInit={(_evt, editor) => (editorRef.current = editor)}
      initialValue="<p>This is the initial content of the editor.</p>"
      init={{
       height: 500,
       menubar: false,
       plugins: [
        'advlist',
        'autolink',
        'lists',
        'link',
        'image',
        'charmap',
        'preview',
        'anchor',
        'searchreplace',
        'visualblocks',
        'code',
        'fullscreen',
        'insertdatetime',
        'media',
        'table',
        'code',
        'help',
        'wordcount',
       ],
       toolbar:
        'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
       content_style:
        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
     />
     <Input
      type="date"
      value={newTask.dueDate}
      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
     />
     <div>
      <label className="block text-sm font-medium mb-1">Priority</label>
      <select
       className="w-full border-gray-300 rounded-md p-2"
       value={newTask.priority}
       onChange={(e) =>
        setNewTask({
         ...newTask,
         priority: parseInt(e.target.value),
        })
       }
      >
       <option value="1">1 (Very High)</option>
       <option value="2">2 (High)</option>
       <option value="3">3 (Moderate)</option>
      </select>
     </div>
     <Button type="submit" disabled={isCreating}>
      Create Task
     </Button>
    </form>
   </div>

   {modalTask && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
     <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full relative">
      <h2 className="text-2xl font-bold mb-4">{modalTask.title}</h2>
      <div className="prose max-h-[70vh] overflow-auto">
       {parse(DOMPurify.sanitize(modalTask.description))}
      </div>
      <Button onClick={() => setModalTask(null)} className="mt-4">
       Close
      </Button>
     </div>
    </div>
   )}
  </div>
 );
}
