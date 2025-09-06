import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  PlayCircle, 
  Edit3, 
  Trash2,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { format, isPast, isToday } from "date-fns";

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

const statusIcons = {
  pending: Circle,
  in_progress: PlayCircle,
  completed: CheckCircle2
};

const statusColors = {
  pending: "text-slate-400 hover:text-indigo-500",
  in_progress: "text-amber-500",
  completed: "text-emerald-500"
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const StatusIcon = statusIcons[task.status];
  const isOverdue = task.due_date && isPast(new Date(task.due_date)) && task.status !== "completed";
  const isDueToday = task.due_date && isToday(new Date(task.due_date));

  const handleStatusClick = () => {
    let newStatus;
    switch (task.status) {
      case "pending":
        newStatus = "in_progress";
        break;
      case "in_progress":
        newStatus = "completed";
        break;
      case "completed":
        newStatus = "pending";
        break;
      default:
        newStatus = "pending";
    }
    onStatusChange(task.id, newStatus);
  };

  return (
    <Card className={`border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 ${
      task.status === "completed" ? "opacity-75" : ""
    } ${isOverdue ? "ring-2 ring-red-100" : ""}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <button
            onClick={handleStatusClick}
            className={`mt-1 transition-colors duration-200 ${statusColors[task.status]}`}
          >
            <StatusIcon className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-lg mb-2 ${
                  task.status === "completed" 
                    ? "line-through text-slate-400" 
                    : "text-slate-900"
                }`}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                    {task.description}
                  </p>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={categoryColors[task.category] || categoryColors.personal}>
                    {task.category}
                  </Badge>
                  
                  <Badge variant="outline" className={`border-current ${priorityColors[task.priority]}`}>
                    {task.priority} priority
                  </Badge>

                  {task.recurring !== "none" && (
                    <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                      {task.recurring}
                    </Badge>
                  )}
                </div>

                {task.due_date && (
                  <div className={`flex items-center gap-1 mt-3 text-sm ${
                    isOverdue ? "text-red-600" : isDueToday ? "text-amber-600" : "text-slate-500"
                  }`}>
                    {isOverdue ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <Calendar className="w-4 h-4" />
                    )}
                    <span className="font-medium">
                      {isOverdue ? "Overdue: " : isDueToday ? "Due today: " : "Due: "}
                      {format(new Date(task.due_date), "MMM d, yyyy 'at' h:mm a")}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(task)}
                  className="hover:bg-slate-100"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(task.id)}
                  className="hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}