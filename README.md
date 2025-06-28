# Taskify Frontend

![React](https://img.shields.io/badge/React-18.2+-blue)
![Vite](https://img.shields.io/badge/Vite-4.3+-purple)
![Material-UI](https://img.shields.io/badge/Material--UI-5.13+-blue)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.0+-purple)
![React Router](https://img.shields.io/badge/React_Router-6.21+-red)

Taskify Frontend is a modern **React-based web application** that provides an intuitive and responsive user interface for the Taskify project management platform. Built with cutting-edge technologies, it offers a seamless Trello-like experience with drag-and-drop functionality, real-time updates, and beautiful Material Design components.

## 🚀 Features

### Core Functionality
- 📋 **Kanban Board Interface**: Drag-and-drop cards and lists with smooth animations
- 👥 **Team Collaboration**: Multi-user board sharing with real-time collaboration
- 🔐 **Authentication System**: Secure login/register with JWT token management
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Custom Themes**: Beautiful Material Design with customizable themes
- 📝 **Rich Text Editing**: Markdown support for card descriptions and comments
- 🔔 **Real-time Notifications**: Toast notifications for all actions and updates
- 📊 **Activity Tracking**: Comprehensive activity logs and history

### User Experience
- ⚡ **Lightning Fast**: Vite-powered development with Hot Module Replacement
- 🎯 **Intuitive UI**: Clean and modern interface with Material-UI components
- 🔄 **Offline Support**: Redux state persistence for better user experience
- 📱 **PWA Ready**: Progressive Web App capabilities
- 🎭 **Loading States**: Smooth loading animations and skeleton screens
- ✨ **Micro-interactions**: Delightful animations and transitions

## 🏗️ Architecture

```
src/
├── apis/                    # API service layer
│   ├── index.js            # Axios instances and API endpoints
│   └── interceptors/       # Request/response interceptors
├── assets/                  # Static assets
│   ├── auth/               # Authentication page assets
│   ├── 404/                # Error page assets
│   └── images/             # Application images
├── components/             # Reusable UI components
│   ├── ActivityLog/        # Activity tracking components
│   ├── AppBar/             # Navigation and header
│   ├── Form/               # Form components and validation
│   ├── Loading/            # Loading states and skeletons
│   ├── Modal/              # Modal dialogs and overlays
│   └── SelectMode/         # Selection and mode components
├── customHooks/            # Custom React hooks
│   ├── useAuth.js          # Authentication hook
│   ├── useLocalStorage.js  # Local storage hook
│   └── useDebounce.js      # Debounce hook
├── pages/                  # Application pages/screens
│   ├── Auth/               # Login and registration
│   ├── Boards/             # Board management and details
│   ├── Settings/           # User and app settings
│   ├── Templates/          # Board templates
│   ├── Users/              # User management
│   └── 404/                # Error pages
├── redux/                  # State management
│   ├── store.js            # Redux store configuration
│   ├── user/               # User state slice
│   ├── activeBoard/        # Current board state
│   └── activeCard/         # Current card state
├── utils/                  # Utility functions
│   ├── authorizeAxios.js   # Axios configuration and interceptors
│   ├── activityLogger.js   # Activity logging utilities
│   ├── constants.js        # Application constants
│   ├── formatter.js        # Data formatting utilities
│   ├── validators.js       # Form validation rules
│   └── sorts.js            # Sorting and filtering utilities
├── App.jsx                 # Main application component
├── main.jsx                # Application entry point
└── themes.js               # Material-UI theme configuration
```

## 🛠️ Technology Stack

### Core Technologies
- **React 18.2+**: Modern React with Hooks and Concurrent Features
- **Vite 4.3+**: Next-generation frontend build tool
- **Material-UI 5.13+**: React components implementing Google's Material Design
- **Redux Toolkit 2.0+**: Efficient Redux for state management
- **React Router 6.21+**: Declarative routing for React applications

### Key Libraries
- **@dnd-kit**: Modern drag-and-drop toolkit for React
- **React Hook Form**: Performant forms with easy validation
- **Axios**: Promise-based HTTP client for API requests
- **React Toastify**: Beautiful toast notifications
- **Moment.js**: Date and time manipulation
- **Lodash**: Utility library for JavaScript
- **Redux Persist**: Persist and rehydrate Redux store

### Development Tools
- **ESLint**: Code linting and quality enforcement
- **Vite SWC**: Super fast JavaScript/TypeScript compiler
- **SVGR**: SVG to React component converter

## 📋 Prerequisites

- **Node.js 16+** (recommended: Node.js 18+)
- **Yarn** or **npm** package manager
- **Modern browser** with ES2020 support

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/bnhan2710/taskify-fe.git
cd taskify-fe
```

### 2. Install Dependencies
```bash
yarn install
# or
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_ROOT=http://localhost:8000

# App Configuration
VITE_APP_TITLE=Taskify
VITE_BUILD_MODE=development

# Optional: Analytics and Monitoring
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
```

### 4. Start Development Server
```bash
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
yarn build
# or
npm run build
```

## 🌐 Deployment

### Vercel Deployment (Recommended)
The project is configured for seamless Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Production deployment
vercel --prod
```

Configuration is already set in `vercel.json`:
- **Framework**: Vite
- **Build Command**: `yarn build`
- **Output Directory**: `dist`
- **SPA Routing**: Configured for React Router
- **Asset Caching**: Optimized for performance

### Manual Deployment
```bash
# Build the application
yarn build

# Deploy the dist/ folder to your hosting provider
# The build output will be in the dist/ directory
```

### Environment Variables for Production
```env
VITE_API_ROOT=https://your-api-domain.com
VITE_BUILD_MODE=production
```

## 🧪 Development

### Available Scripts

```bash
# Development
yarn dev                    # Start development server with HMR
yarn preview               # Preview production build locally

# Building
yarn build                 # Build for production
yarn copy-assets          # Copy static assets to public directory

# Code Quality
yarn lint                  # Run ESLint
yarn lint:fix             # Fix ESLint issues automatically
```

### Development Guidelines

#### Code Style
- Follow React best practices and hooks patterns
- Use functional components with hooks
- Implement proper TypeScript types (when applicable)
- Follow Material-UI design principles
- Use ESLint configuration for consistent code style

#### Component Structure
```jsx
// Component template
import React from 'react'
import { Box, Typography } from '@mui/material'

const ComponentName = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState()
  
  // Event handlers
  const handleAction = () => {
    // Handle action
  }
  
  // Render
  return (
    <Box>
      <Typography variant="h6">Component Content</Typography>
    </Box>
  )
}

export default ComponentName
```

#### State Management
- Use Redux Toolkit for global state
- Use local state for component-specific data
- Implement proper state normalization
- Use Redux DevTools for debugging

## 🎨 UI/UX Features

### Design System
- **Material Design 3**: Modern Material You design principles
- **Responsive Layout**: Mobile-first responsive design
- **Dark/Light Theme**: Automatic theme switching
- **Custom Color Palette**: Brand-consistent color scheme
- **Typography Scale**: Harmonious text hierarchy

### User Experience
- **Drag & Drop**: Smooth card and list reordering
- **Keyboard Navigation**: Full keyboard accessibility
- **Loading States**: Skeleton screens and progress indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation with helpful messages

### Performance Optimizations
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Dynamic imports for better performance
- **Bundle Optimization**: Vendor chunk splitting
- **Image Optimization**: Optimized asset loading
- **Memory Management**: Proper cleanup and optimization

## 🔒 Security Features

- **JWT Token Management**: Secure token storage and refresh
- **Protected Routes**: Authentication-based route protection
- **XSS Protection**: Input sanitization and validation
- **CORS Handling**: Proper cross-origin request handling
- **Environment Variables**: Secure configuration management

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile browsers**: iOS Safari 14+, Chrome Mobile 90+

## 🎯 Key Components

### Board Management
- **Board Dashboard**: Overview of all boards
- **Board Creation**: Template-based board creation
- **Board Settings**: Customization and permissions
- **Board Sharing**: Team collaboration features

### Task Management
- **Card Creation**: Rich task creation with attachments
- **Card Details**: Comprehensive task information
- **Checklists**: Subtask management
- **Comments**: Team communication

### User Experience
- **Authentication**: Secure login/registration flow
- **User Settings**: Profile and preference management
- **Notifications**: Real-time activity notifications
- **Search**: Global search functionality

## 🔧 Configuration

### Vite Configuration
The project uses optimized Vite configuration:
- **React SWC**: Fast compilation and HMR
- **Path Aliases**: `~` for `src/` directory
- **SVG Support**: Automatic SVG to React component conversion
- **Bundle Optimization**: Manual chunk splitting for optimal loading

### ESLint Configuration
Comprehensive linting setup:
- React best practices
- Hooks rules enforcement
- Import optimization
- Code style consistency
- Performance rules

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Follow** the coding standards and run linting
4. **Test** your changes thoroughly
5. **Commit** with descriptive messages
6. **Push** to your branch: `git push origin feature/amazing-feature`
7. **Create** a Pull Request


## 🆘 Troubleshooting

### Common Issues

**Development server not starting:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
yarn install
```

**Build errors:**
```bash
# Check for TypeScript errors
yarn build
# Clear Vite cache
rm -rf node_modules/.vite
```

**API connection issues:**
- Verify `VITE_API_ROOT` environment variable
- Check backend server status
- Verify network connectivity

## 📄 License

This project is licensed under the **ISC License**.

## 👨‍💻 Author

**bnhan2710**
- GitHub: [@bnhan2710](https://github.com/bnhan2710)

## 🌟 Acknowledgments

- **Material-UI Team**: For the excellent component library
- **Vite Team**: For the amazing build tool
- **React Team**: For the powerful frontend framework
- **Redux Team**: For the predictable state management

---

⭐ **Star this repository if it helped you!**

🚀 **Happy coding with Taskify!**
