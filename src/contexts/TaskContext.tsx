import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed';
  category: 'work' | 'personal' | 'health' | 'learning' | 'finance' | 'social';
  dueDate: string;
  estimatedDuration: string;
  createdAt: string;
  completedAt?: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (taskData: Omit<Task, 'id' | 'status' | 'createdAt'>) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  deleteTask: (id: string) => void;
  getTasksByDate: (date: string) => Task[];
  getTaskStats: () => {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    overdue: number;
    completedToday: number;
  };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  const addTask = (taskData: Omit<Task, 'id' | 'status' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prev => [...prev, newTask]);
    toast({
      title: "Task Created!",
      description: `"${newTask.title}" has been added to your tasks.`,
    });
  };

  const updateTaskStatus = (id: string, status: Task['status']) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const updatedTask = {
          ...task,
          status,
          completedAt: status === 'completed' ? new Date().toISOString() : undefined,
        };
        
        // Show appropriate toast
        if (status === 'completed') {
          toast({
            title: "Task Completed! 🎉",
            description: `"${task.title}" has been marked as completed.`,
          });
        } else if (status === 'in_progress') {
          toast({
            title: "Task In Progress",
            description: `"${task.title}" is now in progress.`,
          });
        } else {
          toast({
            title: "Task Updated",
            description: `"${task.title}" status has been updated.`,
          });
        }
        
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setTasks(prev => prev.filter(t => t.id !== id));
      toast({
        title: "Task Deleted",
        description: `"${task.title}" has been removed.`,
        variant: "destructive",
      });
    }
  };

  const getTasksByDate = (date: string) => {
    return tasks.filter(task => task.dueDate === date);
  };

  const getTaskStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in_progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      overdue: tasks.filter(t => 
        t.status !== 'completed' && 
        new Date(t.dueDate) < now
      ).length,
      completedToday: tasks.filter(t => 
        t.status === 'completed' && 
        t.completedAt && 
        t.completedAt.split('T')[0] === today
      ).length,
    };
  };

  const value = {
    tasks,
    addTask,
    updateTaskStatus,
    deleteTask,
    getTasksByDate,
    getTaskStats,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}