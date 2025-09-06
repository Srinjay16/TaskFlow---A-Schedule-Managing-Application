import { Card, CardContent } from "@/Components/ui/card";
import { BarChart3, TrendingUp, CheckCircle, Timer, PieChart } from "lucide-react";

export default function Analytics() {
  return (
    <>
      {/* Header */}
      <header className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">Track your productivity and progress</p>
          </div>
        </div>
      </header>

      {/* Analytics Content */}
      <div className="p-6 space-y-6">
        {/* Analytics Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="metric-card" data-testid="card-total-tasks">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                  <p className="text-3xl font-bold text-foreground mt-1">0</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <BarChart3 className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card" data-testid="card-completion-rate">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-3xl font-bold text-foreground mt-1">0%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-green-600 dark:text-green-400 w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card" data-testid="card-completed">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold text-foreground mt-1">0</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card" data-testid="card-avg-duration">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                  <p className="text-3xl font-bold text-foreground mt-1">0m</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <Timer className="text-orange-600 dark:text-orange-400 w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Progress Chart */}
          <Card data-testid="card-weekly-progress">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Weekly Progress</h2>
              <div className="h-64 flex items-end justify-center space-x-8">
                {/* Chart placeholder */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-primary bg-opacity-20 rounded-t"></div>
                  <span className="text-xs text-muted-foreground mt-2">Jul 20</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-16 bg-primary bg-opacity-20 rounded-t"></div>
                  <span className="text-xs text-muted-foreground mt-2">Aug 3</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-24 bg-primary bg-opacity-20 rounded-t"></div>
                  <span className="text-xs text-muted-foreground mt-2">Aug 17</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-12 bg-primary bg-opacity-20 rounded-t"></div>
                  <span className="text-xs text-muted-foreground mt-2">Aug 31</span>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">Task completion over time</p>
            </CardContent>
          </Card>

          {/* Task Categories */}
          <Card data-testid="card-task-categories">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Task Categories</h2>
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <PieChart className="text-muted-foreground w-8 h-8" />
                  </div>
                  <p className="text-muted-foreground">No data available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Breakdown */}
        <Card data-testid="card-priority-breakdown">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Priority Breakdown</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">0</div>
                <p className="text-sm text-muted-foreground">Low Priority</p>
              </div>
              <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">0</div>
                <p className="text-sm text-muted-foreground">Medium Priority</p>
              </div>
              <div className="text-center p-6 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">0</div>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </div>
              <div className="text-center p-6 bg-red-50 dark:bg-red-950 rounded-lg">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">0</div>
                <p className="text-sm text-muted-foreground">Urgent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
