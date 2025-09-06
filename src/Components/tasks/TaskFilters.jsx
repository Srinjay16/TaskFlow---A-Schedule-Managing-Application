import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TaskFilters({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
        <SelectTrigger className="bg-white/80 backdrop-blur-sm border-slate-200">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.priority} onValueChange={(value) => handleFilterChange("priority", value)}>
        <SelectTrigger className="bg-white/80 backdrop-blur-sm border-slate-200">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="urgent">Urgent</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
        <SelectTrigger className="bg-white/80 backdrop-blur-sm border-slate-200">
          <SelectValue placeholder="Category" />
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

      <Select value={filters.dueDate} onValueChange={(value) => handleFilterChange("dueDate", value)}>
        <SelectTrigger className="bg-white/80 backdrop-blur-sm border-slate-200">
          <SelectValue placeholder="Due Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Dates</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="overdue">Overdue</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}