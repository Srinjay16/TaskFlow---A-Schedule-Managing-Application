import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Zap, LayoutDashboard, CheckSquare, Calendar, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    id: "tasks",
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    id: "calendar",
    label: "Calendar", 
    href: "/calendar",
    icon: Calendar,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="text-primary-foreground text-sm w-4 h-4" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-foreground">TaskFlow</h1>
              <p className="text-sm text-muted-foreground">Productivity Companion</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                NAVIGATION
              </h3>
            </div>

            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  data-testid={`nav-${item.id}`}
                  className={cn(
                    "sidebar-item flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium",
                    isActive
                      ? "active"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="text-lg w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
