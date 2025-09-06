import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Plus, CheckCircle } from "lucide-react";
import TaskDialog from "@/Components/tasks/TaskDialog";

export default function Tasks() {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
            <p className="text-muted-foreground mt-1">Manage your tasks and stay productive</p>
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

      {/* Tasks Content */}
      <div className="p-6">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <Input 
              type="text" 
              placeholder="Search tasks..." 
              className="w-full"
              data-testid="input-search-tasks"
            />
          </div>
          <Select data-testid="select-status">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          
          <Select data-testid="select-priority">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
          
          <Select data-testid="select-categories">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
            </SelectContent>
          </Select>
          
          <Select data-testid="select-dates">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Dates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tasks List */}
        <Card data-testid="card-tasks-list">
          <CardContent className="p-0">
            {/* Empty State */}
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-muted-foreground w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-6">Create your first task to get started with your productivity journey!</p>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90" 
                data-testid="button-create-first-task"
                onClick={() => setIsTaskDialogOpen(true)}
              >
                <Plus className="mr-2 w-4 h-4" />
                Create First Task
              </Button>
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
