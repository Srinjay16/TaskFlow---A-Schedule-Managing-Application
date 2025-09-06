import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function TaskSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
      <Input
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 bg-white/80 backdrop-blur-sm border-slate-200 focus:border-indigo-300 focus:ring-indigo-200"
      />
    </div>
  );
}