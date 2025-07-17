'use client';

import { useEffect, useState, useCallback } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import axios from 'axios';
import TaskInput from './components/TaskInput';

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    if (!isLoaded || !user?.id) return;

    try {
      const token = await getToken();
      const res = await axios.get(
        `http://localhost:5000/v1/tasks?clerkId=${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(res.data.data || []);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('❌ Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user, isLoaded, getToken]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (title: string, description: string) => {
    try {
      const token = await getToken();
      const res = await axios.post(
        `http://localhost:5000/v1/tasks/create`,
        {
          title,
          description,
          clerkId: user?.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newTask = res.data?.data?.id ? res.data.data : res.data.data[0];
      if (newTask) {
        setTasks((prev) => [newTask, ...prev]);
      }
    } catch (err) {
      console.error('❌ Error creating task:', err);
    }
  };

  const toggleCompletion = async (taskId: string, completed: boolean) => {
    try {
      const token = await getToken();
      await axios.put(
        `http://localhost:5000/v1/tasks/${taskId}`,
        { completed: !completed },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, completed: !completed } : t
        )
      );
    } catch (err) {
      console.error('❌ Error toggling task status:', err);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const token = await getToken();
      await axios.delete(`http://localhost:5000/v1/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error('❌ Error deleting task:', err);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📋 Your Tasks</h1>
      <TaskInput onCreate={handleCreate} />

      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow p-4 mb-3 border flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-400 mt-1">
                Status: {task.completed ? '✅ Completed' : '❌ Incomplete'}
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleCompletion(task.id, task.completed)
                  }
                  className="w-5 h-5"
                  title={`Mark as ${task.completed ? 'incomplete' : 'complete'}`}
                />
              </label>

              {task.completed && (
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-xs text-red-600 hover:text-red-800 mt-1"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
