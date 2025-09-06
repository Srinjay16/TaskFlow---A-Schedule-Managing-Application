import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Plus, List, Clock, CheckCircle, AlertTriangle, ArrowRight, Flame, Target, TrendingUp, Calendar, MoreVertical } from "lucide-react";
import { useTask, Task } from "@/contexts/TaskContext";
import TaskDialog from "@/Components/tasks/TaskDialog";
import { format, isToday } from "date-fns";

export default function Dashboard() {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const { tasks, getTaskStats, updateTaskStatus } = useTask();
  const stats = getTaskStats();

  const todaysTasks = tasks.filter(task => 
    task.dueDate && isToday(new Date(task.dueDate))
  ).slice(0, 5); // Show max 5 tasks

  const upcomingTasks = tasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate) > new Date() &&
    !isToday(new Date(task.dueDate))
  ).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).slice(0, 5);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good Morning!</h1>
            <p className="text-muted-foreground mt-1">Ready to tackle your tasks today?</p>
          </div>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90" 
            data-testid="button-new-task"
            onClick={() => setIsTaskDialogOpen(true)}
          >
            <Plus className="mr-2 w-4 h-4" />
            New Task
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-6 space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="metric-card" data-testid="card-total-tasks">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <List className="text-blue-600 dark:text-blue-400 text-xl w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card" data-testid="card-pending-tasks">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <Clock className="text-orange-600 dark:text-orange-400 text-xl w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card" data-testid="card-completed-today">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed Today</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stats.completedToday}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-600 dark:text-green-400 text-xl w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card" data-testid="card-overdue-tasks">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stats.overdue}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <AlertTriangle className="text-red-600 dark:text-red-400 text-xl w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Tasks and Productivity Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Tasks */}
          <Card className="lg:col-span-2" data-testid="card-todays-tasks">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Today's Tasks</h2>
                <a href="/tasks" className="text-primary text-sm font-medium hover:underline" data-testid="link-view-all-tasks">
                  View All <ArrowRight className="ml-1 w-4 h-4 inline" />
                </a>
              </div>
              
              {todaysTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-muted-foreground text-2xl w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No tasks for today</h3>
                  <p className="text-muted-foreground">Enjoy your free time or add some tasks to stay productive!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todaysTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Button 
                          size="sm" 
                          variant={task.status === 'completed' ? 'default' : 'outline'}
                          onClick={() => updateTaskStatus(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                          className="h-6 w-6 p-0"
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                        <div>
                          <p className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                              {task.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Productivity Stats */}
          <Card data-testid="card-productivity-stats">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Productivity Stats</h2>
              
              <div className="space-y-4">
                <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
                      <p className="text-sm text-muted-foreground">Total completed</p>
                    </div>
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <Flame className="text-white w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</p>
                      <p className="text-sm text-muted-foreground">Completion rate</p>
                    </div>
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Target className="text-white w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-primary bg-opacity-10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats.inProgress}</p>
                      <p className="text-sm text-muted-foreground">In progress</p>
                    </div>
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <TrendingUp className="text-primary-foreground w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tasks */}
        <Card data-testid="card-upcoming-tasks">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Upcoming Tasks</h2>
            
            {upcomingTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-muted-foreground text-2xl w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No upcoming tasks</h3>
                <p className="text-muted-foreground">You're all caught up! Consider adding some future tasks.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{task.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Due {format(new Date(task.dueDate), 'MMM dd')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
