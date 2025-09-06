import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { CheckSquare } from "lucide-react";

import TaskCard from "./TaskCard";

export default function TaskList({ tasks, isLoading, onEdit, onDelete, onStatusChange }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="p-6 rounded-xl border border-slate-200 bg-white/80">
            <div className="flex items-start gap-4">
              <Skeleton className="w-5 h-5 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-24">
        <CheckSquare className="w-16 h-16 text-slate-300 mx-auto mb-6" />
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No tasks found</h3>
        <p className="text-slate-600 mb-6">
          Create your first task to get started with your productivity journey!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}