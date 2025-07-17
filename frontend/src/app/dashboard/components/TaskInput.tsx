'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface TaskInputProps {
  onCreate: (title: string, description: string) => void;
}

export default function TaskInput({ onCreate }: TaskInputProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title.trim(), description.trim());
    setTitle('');
    setDescription('');
    setSuggestions([]);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (title.trim().length >= 3) {
        try {
          setLoading(true);
          const res = await axios.post(`http://localhost:5000/v1/tasks/generate`, {
            topic: title.trim(),
          });
          setSuggestions(res.data.data || []);
        } catch (err) {
          console.error('AI Suggestion failed:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [title]);

  const handleSuggestionClick = (suggestedTitle: string) => {
    setTitle(suggestedTitle);
    setSuggestions([]);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-xl shadow border relative">
      <h2 className="text-lg font-semibold mb-2">➕ Create New Task</h2>

      <div className="relative">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-2 mb-2 border rounded"
          required
        />

        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-40 overflow-auto top-14">
            {suggestions.map((s, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(s)}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description (optional)"
        className="w-full p-2 mb-2 border rounded"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Generating...' : 'Create Task'}
      </button>
    </form>
  );
}
