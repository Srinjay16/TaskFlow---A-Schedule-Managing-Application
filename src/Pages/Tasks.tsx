import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Plus, CheckCircle, Clock, Play, Trash2, MoreVertical, Calendar } from "lucide-react";
import { useTask, Task } from "@/contexts/TaskContext";
import TaskDialog from "@/Components/tasks/TaskDialog";
import { format, isAfter, startOfDay } from "date-fns";

export default function Tasks() {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const { tasks, updateTaskStatus, deleteTask } = useTask();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-200';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-200';
    }
  };

  const isOverdue = (task: Task) => {
    if (!task.dueDate || task.status === 'completed') return false;
    return isAfter(startOfDay(new Date()), startOfDay(new Date(task.dueDate)));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'overdue' ? isOverdue(task) : task.status === statusFilter);
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select data-testid="select-status" value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          
          <Select data-testid="select-priority" value={priorityFilter} onValueChange={setPriorityFilter}>
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
          
          <Select data-testid="select-categories" value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="learning">Learning</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="social">Social</SelectItem>
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
            {filteredTasks.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-muted-foreground w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {tasks.length === 0 ? "No tasks found" : "No matching tasks"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {tasks.length === 0 
                    ? "Create your first task to get started with your productivity journey!"
                    : "Try adjusting your filters or search terms."
                  }
                </p>
                {tasks.length === 0 && (
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90" 
                    data-testid="button-create-first-task"
                    onClick={() => setIsTaskDialogOpen(true)}
                  >
                    <Plus className="mr-2 w-4 h-4" />
                    Create First Task
                  </Button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Button
                          size="sm"
                          variant={task.status === 'completed' ? 'default' : 'outline'}
                          onClick={() => updateTaskStatus(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                          className="h-6 w-6 p-0 mt-1"
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className={`font-medium text-sm ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                              {task.title}
                            </h4>
                            {isOverdue(task) && (
                              <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs">
                                Overdue
                              </Badge>
                            )}
                          </div>
                          
                          {task.description && (
                            <p className={`text-xs mb-2 ${task.status === 'completed' ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                              {task.description}
                            </p>
                          )}
                          
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                              {task.status.replace('_', ' ')}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {task.category}
                            </Badge>
                            {task.dueDate && (
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
                              </div>
                            )}
                            {task.estimatedDuration && (
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{task.estimatedDuration}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {task.status !== 'in_progress' && (
                            <DropdownMenuItem onClick={() => updateTaskStatus(task.id, 'in_progress')}>
                              <Play className="mr-2 h-4 w-4" />
                              Start Task
                            </DropdownMenuItem>
                          )}
                          {task.status !== 'pending' && (
                            <DropdownMenuItem onClick={() => updateTaskStatus(task.id, 'pending')}>
                              <Clock className="mr-2 h-4 w-4" />
                              Mark Pending
                            </DropdownMenuItem>
                          )}
                          {task.status !== 'completed' && (
                            <DropdownMenuItem onClick={() => updateTaskStatus(task.id, 'completed')}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark Complete
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => deleteTask(task.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Task
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
