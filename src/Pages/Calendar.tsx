import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Plus, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useTask, Task } from "@/contexts/TaskContext";
import TaskDialog from "@/Components/tasks/TaskDialog";
import { cn } from "@/lib/utils";
import { format, isSameDay, startOfMonth, endOfMonth } from "date-fns";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Calendar() {
  const { tasks, getTasksByDate } = useTask();
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 6)); // September 6, 2025
  const [selectedDate, setSelectedDate] = useState(6);
  
  const getTasksForDay = (day: number) => {
    const date = new Date(year, month, day);
    const dateStr = format(date, 'yyyy-MM-dd');
    return tasks.filter(task => task.dueDate === dateStr);
  };
  
  const getMonthStats = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const monthTasks = tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate >= monthStart && taskDate <= monthEnd;
    });
    
    return {
      daysWithTasks: new Set(monthTasks.map(task => task.dueDate)).size,
      completed: monthTasks.filter(task => task.status === 'completed').length,
      pending: monthTasks.filter(task => task.status === 'pending' || task.status === 'in_progress').length,
      overdue: monthTasks.filter(task => task.status !== 'completed' && new Date(task.dueDate) < new Date()).length,
    };
  };
  
  const monthStats = getMonthStats();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays = [];
  
  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: false,
      hasTasks: false,
    });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const tasksForDay = getTasksForDay(day);
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isToday: day === today,
      hasTasks: tasksForDay.length > 0,
      tasks: tasksForDay,
    });
  }
  
  // Next month days
  const remainingCells = 42 - calendarDays.length;
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isToday: false,
      hasTasks: false,
    });
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(month - 1);
    } else {
      newDate.setMonth(month + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
            <p className="text-muted-foreground mt-1">View your tasks in calendar format</p>
          </div>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90" 
            data-testid="button-add-task"
            onClick={() => setIsTaskDialogOpen(true)}
          >
            <Plus className="mr-2 w-4 h-4" />
            Add Task
          </Button>
        </div>
      </header>

      {/* Calendar Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2" data-testid="card-calendar">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">{MONTHS[month]} {year}</h2>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigateMonth('prev')}
                    data-testid="button-prev-month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium text-foreground px-4">{MONTHS[month]} {year}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigateMonth('next')}
                    data-testid="button-next-month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Days of Week Header */}
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-3">
                    {day}
                  </div>
                ))}
                
                {/* Calendar Days */}
                {calendarDays.map((dayData, index) => (
                  <div
                    key={index}
                    onClick={() => dayData.isCurrentMonth && setSelectedDate(dayData.day)}
                    className={cn(
                      "calendar-day text-center py-3 text-sm rounded cursor-pointer",
                      dayData.isCurrentMonth 
                        ? "text-foreground" 
                        : "text-muted-foreground",
                      dayData.isToday && "today",
                      dayData.hasTasks && "has-tasks",
                      selectedDate === dayData.day && dayData.isCurrentMonth && !dayData.isToday && "bg-primary bg-opacity-20"
                    )}
                    data-testid={`calendar-day-${dayData.day}`}
                  >
                    {dayData.day}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Day Details */}
          <Card data-testid="card-day-details">
            <CardContent className="p-6">
              {(() => {
                const selectedTasks = getTasksForDay(selectedDate);
                return (
                  <>
                    <h3 className="font-semibold text-foreground mb-4">
                      {format(new Date(year, month, selectedDate), 'EEEE, MMM d')}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{selectedTasks.length} tasks scheduled</p>
                    
                    {/* Tasks for selected date */}
                    <div className="space-y-3">
                      {selectedTasks.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <Clock className="text-muted-foreground w-6 h-6" />
                          </div>
                          <h4 className="font-medium text-foreground mb-1">No tasks scheduled for this date</h4>
                          <p className="text-sm text-muted-foreground">Select a date with tasks or create a new one</p>
                        </div>
                      ) : (
                        selectedTasks.map((task) => (
                          <div key={task.id} className="p-3 border border-border rounded-lg">
                            <h5 className="font-medium text-sm text-foreground mb-1">{task.title}</h5>
                            <div className="flex items-center space-x-2">
                              <Badge className={`text-xs ${
                                task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                task.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {task.priority}
                              </Badge>
                              <Badge className={`text-xs ${
                                task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {task.status.replace('_', ' ')}
                              </Badge>
                            </div>
                            {task.estimatedDuration && (
                              <p className="text-xs text-muted-foreground mt-1">{task.estimatedDuration}</p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </>
                );
              })()}

              {/* Mini calendar for current month */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-7 gap-1 text-xs">
                  {DAYS_OF_WEEK.map((day) => (
                    <div key={day} className="text-center text-muted-foreground py-1">{day}</div>
                  ))}
                  
                  {calendarDays.slice(0, 35).map((dayData, index) => (
                    <div
                      key={index}
                      className={cn(
                        "text-center py-1 cursor-pointer rounded",
                        dayData.isCurrentMonth 
                          ? "text-foreground hover:bg-muted" 
                          : "text-muted-foreground",
                        dayData.isToday && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => dayData.isCurrentMonth && setSelectedDate(dayData.day)}
                      data-testid={`mini-calendar-day-${dayData.day}`}
                    >
                      {dayData.day}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Month Overview */}
        <Card className="mt-6" data-testid="card-month-overview">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Month Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{monthStats.daysWithTasks}</div>
                <p className="text-sm text-muted-foreground">Days with tasks</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{monthStats.completed}</div>
                <p className="text-sm text-muted-foreground">Completed this month</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{monthStats.pending}</div>
                <p className="text-sm text-muted-foreground">Pending this month</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{monthStats.overdue}</div>
                <p className="text-sm text-muted-foreground">Overdue this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Dialog */}
      <TaskDialog 
        open={isTaskDialogOpen} 
        onOpenChange={setIsTaskDialogOpen}
      />
    </>
  );
}
