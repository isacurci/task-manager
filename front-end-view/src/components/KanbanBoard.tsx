import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Task } from '../types';
import { tasksAPI } from '../services/api';
import { TaskMenu } from './TaskMenu';
import { EditTaskModal } from './EditTaskModal';

const COLUMNS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
} as const;

export const KanbanBoard = forwardRef<{ fetchTasks: () => void }>((_, ref) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getTasks();
      setTasks(response.data.tasks);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchTasks
  }));

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData('taskId', taskId.toString());
  };

  const handleDrop = async (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    try {
      await tasksAPI.moveTask(taskId, status);
      fetchTasks();
    } catch (err) {
      setError('Failed to move task');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.deleteTask(taskId);
        fetchTasks();
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(COLUMNS).map(([status, title]) => (
          <div
            key={status}
            className="bg-gray-100 rounded-lg p-4"
            onDrop={(e) => handleDrop(e, status as Task['status'])}
            onDragOver={handleDragOver}
          >
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === status)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="bg-white p-4 rounded shadow cursor-move hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{task.title}</h3>
                      <TaskMenu
                        task={task}
                        onEdit={() => setEditingTask(task)}
                        onDelete={() => handleDeleteTask(task.id.toString())}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      {task.priority && task.priority !== 'NONE' && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          task.priority === 'HIGH'
                            ? 'bg-red-200 text-red-800'
                            : task.priority === 'MEDIUM'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-green-200 text-green-800'
                        }`}>
                          {task.priority.charAt(0) + task.priority.slice(1).toLowerCase()}
                        </span>
                      )}
                      {task.assignedTo && (
                        <span className="text-xs text-gray-500">
                          {task.assignedTo.name}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      {editingTask && (
        <EditTaskModal
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          onTaskUpdated={fetchTasks}
          task={editingTask}
        />
      )}
    </>
  );
}); 