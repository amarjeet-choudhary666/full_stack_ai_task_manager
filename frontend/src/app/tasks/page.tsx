'use client';
import { useState } from 'react';

export default function CreateTaskPage() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:3000/api/tasks/create', {
      method: 'POST',
      body: JSON.stringify({ title, description: desc }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Create Task</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border p-2" />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="border p-2 my-2" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </div>
  );
}
