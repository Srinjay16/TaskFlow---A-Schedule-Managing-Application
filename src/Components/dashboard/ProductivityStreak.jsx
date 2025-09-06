import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Flame, TrendingUp, Target } from "lucide-react";
import { startOfDay, endOfDay, subDays, isWithinInterval } from "date-fns";

export default function ProductivityStreak({ tasks, isLoading }) {
  const calculateStreak = () => {
    let streak = 0;
    let currentDate = startOfDay(new Date());
    
    while (streak < 30) { // Limit to 30 days to avoid infinite loop
      const dayStart = startOfDay(currentDate);
      const dayEnd = endOfDay(currentDate);
      
      const dayCompletedTasks = tasks.filter(task => 
        task.completed_at && 
        isWithinInterval(new Date(task.completed_at), { start: dayStart, end: dayEnd })
      );
      
      if (dayCompletedTasks.length > 0) {
        streak++;
        currentDate = subDays(currentDate, 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getCompletionRate = () => {
    const completedTasks = tasks.filter(task => task.status === "completed").length;
    return tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  };

  const streak = calculateStreak();
  const completionRate = getCompletionRate();

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">Productivity Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900">Productivity Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Streak */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-2xl text-slate-900">{streak}</h3>
            <p className="text-sm text-slate-600">Day streak</p>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-2xl text-slate-900">{completionRate}%</h3>
            <p className="text-sm text-slate-600">Completion rate</p>
          </div>
        </div>

        {/* Total Tasks */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-2xl text-slate-900">{tasks.length}</h3>
            <p className="text-sm text-slate-600">Total tasks</p>
          </div>
        </div>

        {streak > 0 && (
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
            <p className="text-sm font-medium text-amber-800">
              🎉 Keep it up! You're on a {streak}-day productivity streak!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}