import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/Components/ui/toaster";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { TaskProvider } from "@/contexts/TaskContext";
import Layout from "@/Components/Layout";
import Dashboard from "@/Pages/Dashboard";
import Tasks from "@/Pages/Tasks";
import Calendar from "@/Pages/Calendar";
import Analytics from "@/Pages/Analytics";
import NotFound from "@/Pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/analytics" component={Analytics} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TaskProvider>
          <Toaster />
          <Router />
        </TaskProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
