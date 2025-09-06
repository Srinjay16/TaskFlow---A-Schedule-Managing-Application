import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Plus, List, Clock, CheckCircle, AlertTriangle, ArrowRight, Flame, Target, TrendingUp, Calendar } from "lucide-react";
import TaskDialog from "@/Components/tasks/TaskDialog";

export default function Dashboard() {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

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
                  <p className="text-3xl font-bold text-foreground mt-1">0</p>
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
                  <p className="text-3xl font-bold text-foreground mt-1">0</p>
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
                  <p className="text-3xl font-bold text-foreground mt-1">0</p>
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
                  <p className="text-3xl font-bold text-foreground mt-1">0</p>
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
              
              {/* Empty State */}
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-muted-foreground text-2xl w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No tasks for today</h3>
                <p className="text-muted-foreground">Enjoy your free time or add some tasks to stay productive!</p>
              </div>
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
                      <p className="text-2xl font-bold text-foreground">0</p>
                      <p className="text-sm text-muted-foreground">Day streak</p>
                    </div>
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <Flame className="text-white w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">0%</p>
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
                      <p className="text-2xl font-bold text-foreground">0</p>
                      <p className="text-sm text-muted-foreground">Total tasks</p>
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
            
            {/* Empty State */}
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-muted-foreground text-2xl w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No upcoming tasks</h3>
              <p className="text-muted-foreground">You're all caught up! Consider adding some future tasks.</p>
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
