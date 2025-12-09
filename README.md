# Task Management Board

A simple Kanban-style task management board built for a frontend internship take-home assignment. This project demonstrates core React concepts, state management, and responsive design.

## Features

- Create, edit, and delete tasks
- Drag and drop tasks between columns (To Do, In Progress, Done)
- Dark mode toggle
- Mobile-responsive design
- Local storage persistence
- Clean and simple UI

## Setup Instructions

Follow these steps to run the project locally:

1. **Clone or Download the Project**
   \`\`\`bash
   git clone <repository-url>
   cd task-management-board
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in Browser**
   - Navigate to `http://localhost:3000`
   - The app should now be running locally

## Tech Stack Explanation

**Next.js 16 with React 19**: Chosen for its modern features, built-in routing, and optimized performance. Next.js provides a great developer experience with hot reload and TypeScript support out of the box, making it ideal for rapid development of interactive applications.

**Tailwind CSS**: Selected for rapid UI development with utility classes. Tailwind makes it easy to build responsive designs and implement dark mode without writing custom CSS, which is perfect for a time-constrained project where speed and consistency are key.

**HTML5 Drag and Drop API**: Used native browser APIs instead of external libraries to keep the codebase simple and easy to understand. This demonstrates fundamental JavaScript knowledge, keeps dependencies minimal, and makes the code easier to explain in technical interviews.

**localStorage**: Implemented for data persistence without needing a backend. This allows the app to work completely client-side while maintaining user data between sessions, perfect for a quick prototype or take-home assignment.

**TypeScript**: Provides type safety and better code documentation, making the codebase more maintainable and easier to explain during technical interviews. It catches errors during development and serves as inline documentation.

## AI Tool Usage

**v0 by Vercel**

**Purpose**: Component structure planning, generating boilerplate code.
## Known Issues

1. **Mobile Drag-and-Drop**: On touch devices, drag-and-drop functionality may not work consistently. This is a limitation of the HTML5 Drag and Drop API on mobile browsers. A production app would use a library like `@dnd-kit` or implement custom touch event handlers.

2. **No Data Validation**: Currently, tasks can be created with very long titles or descriptions. While the UI handles text wrapping, adding character limits and validation would improve the user experience.

3. **No Undo Feature**: Once a task is deleted, it cannot be recovered. Implementing an undo/redo stack would enhance user experience and prevent accidental data loss.

4. **Single User Only**: The app uses localStorage, so data is not shared across devices or users. A backend database would be needed for multi-user support or cross-device synchronization.

5. **No Task Persistence Across Browsers**: Since localStorage is browser-specific, tasks created in Chrome won't appear in Firefox or other browsers on the same device.

## Project Structure


```
├── app/
│   ├── page.tsx          # Main page that renders the Board component
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles and Tailwind config
├── src/
│   ├── components/
│   │   ├── Board.tsx           # Main Kanban board container
│   │   ├── Column.tsx          # Individual column component
│   │   ├── TaskCard.tsx        # Task card with drag functionality
│   │   └── AddTaskForm.tsx     # Form for adding/editing tasks
│   ├── types/
│   │   └── task.ts             # TypeScript type definitions
│   └── lib/
│       └── storage.ts          # localStorage utility functions
├── components/ui/        # shadcn/ui components
└── README.md            # This file
```
