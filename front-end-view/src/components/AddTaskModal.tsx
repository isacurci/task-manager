import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../types';
import { tasksAPI } from '../services/api';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onTaskAdded,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const priorityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (priorityRef.current && !priorityRef.current.contains(event.target as Node)) {
        setIsPriorityOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!priority) {
      setError('Please select a priority');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await tasksAPI.createTask({
        title,
        description,
        priority,
        status: 'TODO',
        assignedTo: null,
      });
      onTaskAdded();
      onClose();
      setTitle('');
      setDescription('');
      setPriority(null);
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'NONE':
        return 'bg-gray-200';
      case 'LOW':
        return 'bg-green-200';
      case 'MEDIUM':
        return 'bg-yellow-200';
      case 'HIGH':
        return 'bg-red-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority <span className="text-red-500">*</span>
            </label>
            <div className="relative" ref={priorityRef}>
              <button
                type="button"
                onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left flex items-center"
              >
                {priority ? (
                  <>
                    <span className={`inline-block w-3 h-3 rounded-full ${getPriorityColor(priority)} mr-2`}></span>
                    {priority.charAt(0) + priority.slice(1).toLowerCase()}
                  </>
                ) : (
                  <span className="text-gray-500">Select task priority</span>
                )}
              </button>
              {isPriorityOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {(['NONE', 'LOW', 'MEDIUM', 'HIGH'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setPriority(p);
                        setIsPriorityOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center"
                    >
                      <span className={`inline-block w-3 h-3 rounded-full ${getPriorityColor(p)} mr-2`}></span>
                      {p.charAt(0) + p.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 