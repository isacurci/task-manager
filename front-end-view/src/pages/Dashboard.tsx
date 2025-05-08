import React, { useState, useRef } from 'react';
import { Layout } from '../components/Layout';
import { KanbanBoard } from '../components/KanbanBoard';
import { AddTaskModal } from '../components/AddTaskModal';

export const Dashboard: React.FC = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const kanbanBoardRef = useRef<{ fetchTasks: () => void }>(null);

  const handleTaskAdded = () => {
    setIsAddTaskModalOpen(false);
    kanbanBoardRef.current?.fetchTasks();
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
          <button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Task
          </button>
        </div>
        <KanbanBoard ref={kanbanBoardRef} />
        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onClose={() => setIsAddTaskModalOpen(false)}
          onTaskAdded={handleTaskAdded}
        />
      </div>
    </Layout>
  );
}; 