# Schedule Manager Application

## Overview

This is a modern React-based schedule management application built with TypeScript and Vite. The application provides a comprehensive task management system with features including task creation, categorization, scheduling, and analytics. It implements a clean, responsive design using shadcn/ui components and Tailwind CSS for styling.

## System Architecture

### Frontend Architecture
- **Framework**: React 19 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and animations

### Component Structure
- **Layout System**: Centralized layout component with sidebar navigation
- **Page Components**: Dedicated pages for Dashboard, Tasks, Calendar, and Analytics
- **UI Components**: Reusable component library in `src/Components/ui/`
- **Entity Models**: JSON schema definitions for data structures (Task entity)

### Design System
- **Theme**: Custom design system with CSS variables for colors, spacing, and typography
- **Typography**: Multiple font families including Inter, Georgia, and Menlo
- **Icons**: Lucide React for consistent iconography
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Data Management
- **Database**: Drizzle ORM configured for PostgreSQL
- **Schema**: Database schema defined in `shared/schema.ts`
- **Migrations**: Automated database migrations in `./migrations` directory
- **API Layer**: Custom query client with error handling and authentication support

### Development Tools
- **Linting**: ESLint with React-specific rules and hooks validation
- **Code Quality**: TypeScript strict mode enabled with comprehensive type checking
- **Development Server**: Vite dev server with HMR and host configuration for Replit

### Application Features
- **Task Management**: Create, update, delete, and categorize tasks
- **Calendar Integration**: Visual calendar interface for task scheduling
- **Analytics Dashboard**: Productivity metrics and task completion tracking
- **Priority System**: Multi-level priority system (low, medium, high, urgent)
- **Status Tracking**: Task status workflow (pending, in_progress, completed)
- **Category System**: Predefined categories (work, personal, health, learning, finance, social)

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 19, React DOM, React Router DOM for application framework
- **State Management**: TanStack React Query for server state and caching
- **Database**: Drizzle ORM and Drizzle Kit for PostgreSQL integration
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS, PostCSS, and Autoprefixer for styling pipeline
- **Icons**: Lucide React for comprehensive icon library
- **Utilities**: date-fns for date manipulation, clsx and tailwind-merge for conditional styling

### Development Dependencies
- **Build Tools**: Vite with React plugin for development and building
- **TypeScript**: Full TypeScript support with React type definitions
- **Code Quality**: ESLint with React hooks and refresh plugins
- **Styling Tools**: Tailwind CSS with typography plugin

### Database Configuration
- **Database URL**: Environment variable `DATABASE_URL` required for PostgreSQL connection
- **ORM**: Drizzle configured with PostgreSQL dialect
- **Schema Location**: Database schema located at `./shared/schema.ts`
- **Migration Output**: Database migrations stored in `./migrations` directory

### External Services
- **Replit Integration**: Configured for Replit development environment with banner script
- **Font Loading**: Google Fonts integration for custom typography
- **Environment Configuration**: Environment-based database configuration
