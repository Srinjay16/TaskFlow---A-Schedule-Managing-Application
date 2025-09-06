import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowRight } from "lucide-react";
import { format, isToday, isTomorrow } from "date-fns";

const categoryColors = {
  work: "bg-blue-100 text-blue-800 border-blue-200",
  personal: "bg-purple-100 text-purple-800 border-purple-200", 
  health: "bg-green-100 text-green-800 border-green-200",
  learning: "bg-orange-100 text-orange-800 border-orange-200",
  finance: "bg-emerald-100 text-emerald-800 border-emerald-200",
  social: "bg-pink-100 text-pink-800 border-pink-200"
};

export default function UpcomingTasks({ tasks, isLoading }) {
  const formatDueDate = (date) => {
    const dueDate = new Date(date);
    if (isToday(dueDate)) return "Today";
    if (isTomorrow(dueDate)) return "Tomorrow";
    return format(dueDate, "MMM d");
  };

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">Upcoming Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border">
              <div className="flex-1">
                <Skeleton className="h-5 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900">Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">No upcoming tasks</h3>
            <p className="text-slate-600">Your schedule is clear for the next week!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div 
                key={task.id} 
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-900 truncate mb-1">
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge className={categoryColors[task.category] || categoryColors.personal}>
                      {task.category}
                    </Badge>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-slate-600">
                    {formatDueDate(task.due_date)}
                  </p>
                  <p className="text-xs text-slate-400">
                    {format(new Date(task.due_date), "h:mm a")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}