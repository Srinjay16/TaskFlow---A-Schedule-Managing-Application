import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const categoryColors = {
  work: "bg-blue-100 text-blue-800 border-blue-200",
  personal: "bg-purple-100 text-purple-800 border-purple-200", 
  health: "bg-green-100 text-green-800 border-green-200",
  learning: "bg-orange-100 text-orange-800 border-orange-200",
  finance: "bg-emerald-100 text-emerald-800 border-emerald-200",
  social: "bg-pink-100 text-pink-800 border-pink-200"
};

const priorityColors = {
  low: "text-slate-500",
  medium: "text-amber-500",
  high: "text-orange-500", 
  urgent: "text-red-500"
};

export default function TodayTasks({ tasks, isLoading, onStatusUpdate }) {
  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">Today's Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border">
              <Skeleton className="w-5 h-5 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-5 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-slate-900">Today's Tasks</CardTitle>
        <Link to={createPageUrl("Tasks")}>
          <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">No tasks for today</h3>
            <p className="text-slate-600">Enjoy your free time or add some tasks to stay productive!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.slice(0, 6).map((task) => (
              <div 
                key={task.id} 
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all duration-200"
              >
                <button
                  onClick={() => onStatusUpdate(task.id, task.status === "completed" ? "pending" : "completed")}
                  className="transition-colors duration-200"
                >
                  {task.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 hover:text-indigo-500" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium truncate ${task.status === "completed" ? "line-through text-slate-400" : "text-slate-900"}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={categoryColors[task.category] || categoryColors.personal}>
                      {task.category}
                    </Badge>
                    <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                {task.due_date && (
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-600">
                      {format(new Date(task.due_date), "h:mm a")}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}