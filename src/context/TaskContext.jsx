import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TASKS } from '../data/initialTasks';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('task_management_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved tasks, resetting to defaults.', e);
      }
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('task_management_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (taskData) => {
    const now = new Date().toISOString();
    const newTask = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id
          ? { ...updatedTask, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getTaskById = (id) => {
    return tasks.find((task) => task.id === id);
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask, getTaskById }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
