import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useColorScheme } from '@mui/material/styles'
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Stack,
  IconButton,
  Tooltip,
  Divider,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import BusinessIcon from '@mui/icons-material/Business'
import SchoolIcon from '@mui/icons-material/School'
import HomeIcon from '@mui/icons-material/Home'
import WorkIcon from '@mui/icons-material/Work'
import GroupIcon from '@mui/icons-material/Group'
import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CopyAllIcon from '@mui/icons-material/CopyAll'
import CloseIcon from '@mui/icons-material/Close'
import ImageIcon from '@mui/icons-material/Image'
import AppBar from '~/components/AppBar/AppBar'
import { createBoardAPI, addListAPI, addCardAPI, uploadBoardBackgroundAPI, addChecklistAPI } from '~/apis'
import { toast } from 'react-toastify'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

// Predefined templates with structure similar to Trello
const predefinedTemplates = [
  {
    id: 'kanban-project',
    title: 'Kanban Project Management',
    description: 'Organize your projects with a kanban board template perfect for agile development and team collaboration.',
    type: 'project',
    category: 'project',
    cover: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    lists: [
      {
        title: 'Backlog',
        cards: [
          { 
            title: 'Define project requirements', 
            description: 'Gather and document all project requirements',
            checklists: [
              'Research similar projects',
              'Interview stakeholders',
              'Document functional requirements',
              'Document non-functional requirements'
            ]
          },
          { 
            title: 'Set up development environment', 
            description: 'Configure tools and development setup',
            checklists: [
              'Install development tools',
              'Set up version control',
              'Configure CI/CD pipeline',
              'Create development database'
            ]
          },
          { title: 'Create project wireframes', description: 'Design initial wireframes and mockups' }
        ]
      },
      {
        title: 'In Progress',
        cards: [
          { 
            title: 'Implement user authentication', 
            description: 'Build login and registration functionality',
            checklists: [
              'Design authentication flow',
              'Implement login API',
              'Implement registration API',
              'Add password validation',
              'Implement JWT tokens',
              'Add logout functionality'
            ]
          },
          { title: 'Design database schema', description: 'Create and optimize database structure' }
        ]
      },
      {
        title: 'Review',
        cards: [
          { title: 'Code review for API endpoints', description: 'Review and test REST API implementation' }
        ]
      },
      {
        title: 'Done',
        cards: [
          { title: 'Project setup completed', description: 'Initial project structure and configuration finished' }
        ]
      }
    ]
  },
  {
    id: 'sprint-planning',
    title: 'Team Sprint Planning',
    description: 'Plan and track your team sprints with this comprehensive template including backlog, sprint tasks, and retrospectives.',
    type: 'team',
    category: 'team',
    cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    lists: [
      {
        title: 'Sprint Backlog',
        cards: [
          { 
            title: 'User Story: Login Feature', 
            description: 'As a user, I want to login to access my account',
            checklists: [
              'Create login form design',
              'Implement form validation',
              'Connect to authentication API',
              'Add error handling',
              'Write unit tests'
            ]
          },
          { title: 'User Story: Dashboard', description: 'As a user, I want to see my dashboard overview' },
          { 
            title: 'Bug Fix: Navigation Issue', 
            description: 'Fix navigation menu not working on mobile',
            checklists: [
              'Reproduce the bug',
              'Identify root cause',
              'Implement fix',
              'Test on different devices',
              'Deploy to staging'
            ]
          }
        ]
      },
      {
        title: 'Sprint Goals',
        cards: [
          { title: 'Complete user authentication module', description: 'Finish all authentication related tasks' },
          { title: 'Implement responsive design', description: 'Ensure all pages work on mobile devices' }
        ]
      },
      {
        title: 'In Development',
        cards: [
          { title: 'API Integration', description: 'Connect frontend with backend APIs' }
        ]
      },
      {
        title: 'Testing',
        cards: []
      },
      {
        title: 'Sprint Review',
        cards: []
      }
    ]
  },
  {
    id: 'business-strategy',
    title: 'Business Strategy Board',
    description: 'Strategic planning template for business goals, objectives, and key results tracking.',
    type: 'business',
    category: 'business',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    lists: [
      {
        title: 'Strategic Goals',
        cards: [
          { 
            title: 'Increase market share by 20%', 
            description: 'Expand customer base and improve market position',
            checklists: [
              'Market research and analysis',
              'Identify target demographics',
              'Develop marketing strategy',
              'Set quarterly milestones',
              'Track progress metrics'
            ]
          },
          { title: 'Launch new product line', description: 'Research and develop innovative product offerings' },
          { title: 'Improve customer satisfaction', description: 'Enhance customer experience and support' }
        ]
      },
      {
        title: 'Key Initiatives',
        cards: [
          { 
            title: 'Digital transformation project', 
            description: 'Modernize business processes and technology',
            checklists: [
              'Assess current systems',
              'Define transformation roadmap',
              'Select technology stack',
              'Train team members',
              'Implement phase 1'
            ]
          },
          { title: 'Marketing campaign launch', description: 'Execute comprehensive marketing strategy' }
        ]
      },
      {
        title: 'In Progress',
        cards: [
          { title: 'Market research analysis', description: 'Analyze competitor landscape and opportunities' }
        ]
      },
      {
        title: 'Completed Objectives',
        cards: [
          { title: 'Q1 Financial review', description: 'Quarterly financial analysis completed' }
        ]
      }
    ]
  },
  {
    id: 'personal-productivity',
    title: 'Personal Task Management',
    description: 'Simple personal productivity board for managing daily tasks, goals, and personal projects.',
    type: 'personal',
    category: 'personal',
    cover: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    lists: [
      {
        title: 'To Do',
        cards: [
          { 
            title: 'Morning workout', 
            description: '30 minutes cardio and strength training',
            checklists: [
              '10 minutes warm-up',
              '15 minutes cardio',
              '10 minutes strength training',
              '5 minutes cool-down'
            ]
          },
          { title: 'Read 20 pages of book', description: 'Continue reading current book' },
          { 
            title: 'Grocery shopping', 
            description: 'Buy ingredients for weekly meal prep',
            checklists: [
              'Check pantry inventory',
              'Plan weekly meals',
              'Make shopping list',
              'Visit grocery store',
              'Store items properly'
            ]
          },
          { title: 'Call mom', description: 'Weekly check-in call with family' }
        ]
      },
      {
        title: 'In Progress',
        cards: [
          { 
            title: 'Learn new programming language', 
            description: 'Complete online course modules',
            checklists: [
              'Complete Chapter 1: Basics',
              'Complete Chapter 2: Functions',
              'Complete Chapter 3: Objects',
              'Build practice project',
              'Take final exam'
            ]
          },
          { title: 'Plan vacation trip', description: 'Research destinations and book flights' }
        ]
      },
      {
        title: 'Waiting For',
        cards: [
          { title: 'Doctor appointment confirmation', description: 'Waiting for appointment scheduling' }
        ]
      },
      {
        title: 'Completed',
        cards: [
          { title: 'Monthly budget review', description: 'Analyzed expenses and savings goals' },
          { title: 'Car maintenance', description: 'Oil change and tire rotation completed' }
        ]
      }
    ]
  },
  {
    id: 'event-planning',
    title: 'Event Planning',
    description: 'Comprehensive event planning template for organizing conferences, parties, or corporate events.',
    type: 'project',
    category: 'project',
    cover: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    lists: [
      {
        title: 'Pre-Planning',
        cards: [
          { 
            title: 'Define event objectives', 
            description: 'Set clear goals and success metrics',
            checklists: [
              'Define event purpose',
              'Set target audience',
              'Establish success metrics',
              'Create timeline',
              'Set initial budget'
            ]
          },
          { title: 'Set budget and timeline', description: 'Establish financial limits and key dates' },
          { 
            title: 'Choose venue', 
            description: 'Research and book appropriate venue',
            checklists: [
              'Research potential venues',
              'Visit top 3 venues',
              'Compare pricing and amenities',
              'Check availability',
              'Book selected venue'
            ]
          }
        ]
      },
      {
        title: 'Vendor Management',
        cards: [
          { title: 'Book catering service', description: 'Select and confirm food and beverage provider' },
          { title: 'Hire photography/videography', description: 'Find professional event documentation' },
          { title: 'Arrange transportation', description: 'Coordinate guest transportation if needed' }
        ]
      },
      {
        title: 'Marketing & Promotion',
        cards: [
          { title: 'Create event website', description: 'Build landing page with event details' },
          { title: 'Social media campaign', description: 'Promote event across social platforms' }
        ]
      },
      {
        title: 'Day of Event',
        cards: []
      },
      {
        title: 'Post-Event',
        cards: []
      }
    ]
  },
  {
    id: 'content-creation',
    title: 'Content Creation Pipeline',
    description: 'Organize your content creation workflow from ideation to publication.',
    type: 'project',
    category: 'project',
    cover: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    lists: [
      {
        title: 'Content Ideas',
        cards: [
          { 
            title: 'How to be productive working from home', 
            description: 'Blog post about remote work tips',
            checklists: [
              'Research current trends',
              'Interview remote workers',
              'Create outline',
              'Write first draft',
              'Edit and review'
            ]
          },
          { title: '10 JavaScript tricks every developer should know', description: 'Technical tutorial article' },
          { title: 'Review of new productivity apps', description: 'Comparison article for tools' }
        ]
      },
      {
        title: 'In Writing',
        cards: [
          { 
            title: 'Guide to React hooks', 
            description: 'Comprehensive tutorial on React hooks usage',
            checklists: [
              'Write introduction',
              'Explain useState hook',
              'Explain useEffect hook',
              'Add code examples',
              'Create summary'
            ]
          }
        ]
      },
      {
        title: 'Review & Edit',
        cards: [
          { title: 'CSS Grid vs Flexbox article', description: 'Technical comparison article ready for review' }
        ]
      },
      {
        title: 'Scheduled',
        cards: []
      },
      {
        title: 'Published',
        cards: [
          { title: 'Getting started with Node.js', description: 'Beginner tutorial published on blog' }
        ]
      }
    ]
  },
  {
    id: 'marketing-campaign',
    title: 'Marketing Campaign',
    description: 'Plan and execute marketing campaigns from concept to analysis.',
    type: 'business',
    category: 'business',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    lists: [
      {
        title: 'Campaign Ideas',
        cards: [
          { 
            title: 'Social media campaign for new product', 
            description: 'Create engaging content for social platforms',
            checklists: [
              'Define campaign objectives',
              'Identify target audience',
              'Create content calendar',
              'Design visual assets',
              'Schedule posts'
            ]
          },
          { title: 'Email marketing series', description: 'Design automated email sequences' },
          { title: 'Influencer collaboration', description: 'Partner with relevant influencers' }
        ]
      },
      {
        title: 'In Design',
        cards: [
          { title: 'Create campaign visuals', description: 'Design graphics and video content' }
        ]
      },
      {
        title: 'Ready to Launch',
        cards: []
      },
      {
        title: 'Live Campaigns',
        cards: []
      },
      {
        title: 'Analysis & Results',
        cards: []
      }
    ]
  },
  {
    id: 'product-development',
    title: 'Product Development',
    description: 'Manage product development lifecycle from research to launch.',
    type: 'project',
    category: 'project',
    cover: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackColor: 'linear-gradient(135deg, #ff8a80 0%, #ffab91 100%)',
    lists: [
      {
        title: 'Research & Discovery',
        cards: [
          { 
            title: 'User research interviews', 
            description: 'Conduct interviews with target users',
            checklists: [
              'Prepare interview questions',
              'Recruit participants',
              'Conduct interviews',
              'Analyze responses',
              'Create user personas'
            ]
          },
          { title: 'Market analysis', description: 'Analyze competitors and market opportunities' },
          { title: 'Technical feasibility study', description: 'Assess technical requirements and constraints' }
        ]
      },
      {
        title: 'Design & Prototyping',
        cards: [
          { 
            title: 'Create user personas', 
            description: 'Define target user archetypes',
            checklists: [
              'Analyze user research data',
              'Identify user patterns',
              'Create persona profiles',
              'Validate with stakeholders'
            ]
          },
          { title: 'Design wireframes', description: 'Create low-fidelity wireframes' }
        ]
      },
      {
        title: 'Development',
        cards: [
          { title: 'Set up development environment', description: 'Configure tools and workflows' }
        ]
      },
      {
        title: 'Testing',
        cards: []
      },
      {
        title: 'Launch',
        cards: []
      }
    ]
  }
]

// Predefined cover options
const predefinedCovers = [
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #ff8a80 0%, #ffab91 100%)'
]

const templateCategories = [
  { id: 'all', name: 'All', icon: null },
  { id: 'business', name: 'Business', icon: <BusinessIcon /> },
  { id: 'education', name: 'Education', icon: <SchoolIcon /> },
  { id: 'personal', name: 'Personal', icon: <HomeIcon /> },
  { id: 'project', name: 'Project Management', icon: <WorkIcon /> },
  { id: 'team', name: 'Team Collaboration', icon: <GroupIcon /> }
]

function Templates() {
  const { mode } = useColorScheme()
  const [templates, setTemplates] = useState(null)
  const [filteredTemplates, setFilteredTemplates] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [imageErrors, setImageErrors] = useState({})
  
  // Modal states
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [boardTitle, setBoardTitle] = useState('')
  const [selectedCover, setSelectedCover] = useState('')
  const [uploadedCover, setUploadedCover] = useState(null)
  
  const navigate = useNavigate()

  useEffect(() => {
    // Only use predefined templates
    setTemplates(predefinedTemplates)
    setFilteredTemplates(predefinedTemplates)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!templates) return

    let filtered = templates

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => {
        const description = template.description?.toLowerCase() || ''
        const title = template.title?.toLowerCase() || ''
        const type = template.type?.toLowerCase() || ''
        
        switch (selectedCategory) {
        case 'business':
          return description.includes('business') || title.includes('business') || type.includes('business')
        case 'education':
          return description.includes('education') || title.includes('education') || description.includes('learning')
        case 'personal':
          return description.includes('personal') || title.includes('personal') || type.includes('personal')
        case 'project':
          return description.includes('project') || title.includes('project') || description.includes('kanban') || type.includes('project')
        case 'team':
          return description.includes('team') || title.includes('team') || description.includes('collaboration') || type.includes('team')
        default:
          return true
        }
      })
    }

    setFilteredTemplates(filtered)
  }, [templates, searchTerm, selectedCategory])

  const handleUseTemplate = async (template) => {
    if (creating) return
    
    setCreating(true)
    try {
      const workspaceId = 'a693e862-6dd3-4f7c-b32a-f72d22a94840' // Default workspace ID
      
      // Create board from template with full structure
      const createBoardDto = {
        title: template.title,
        description: template.description || `Created from template: ${template.title}`,
        type: 'private',
        workspaceId
      }

      const newBoardId = await createBoardAPI(createBoardDto)
      
      // Create lists and cards sequentially to ensure proper order
      for (let i = 0; i < template.lists.length; i++) {
        const listTemplate = template.lists[i]
        
        // Create list with proper boardId
        const createListDto = {
          title: listTemplate.title,
          boardId: String(newBoardId) // Ensure boardId is string
        }
        
        const listResponse = await addListAPI(createListDto)
        // Extract list ID properly from response and ensure it's a string
        const newListId = String(listResponse.id)
        
        // Create cards for this list with proper listId
        for (let j = 0; j < listTemplate.cards.length; j++) {
          const cardTemplate = listTemplate.cards[j]
          
          const createCardDto = {
            title: cardTemplate.title,
            listId: newListId // Ensure listId is properly set as string according to backend API
          }
          
          const newCardResponse = await addCardAPI(createCardDto)
          const newCardId = String(newCardResponse.id)
          
          // Create checklists for this card if they exist
          if (cardTemplate.checklists && cardTemplate.checklists.length > 0) {
            for (let k = 0; k < cardTemplate.checklists.length; k++) {
              const checklistItem = cardTemplate.checklists[k]
              
              const createChecklistDto = {
                description: checklistItem,
                cardId: newCardId
              }
              
              try {
                await addChecklistAPI(createChecklistDto)
              } catch (checklistError) {
                console.warn('Failed to create checklist item:', checklistError)
                // Continue with next checklist item even if one fails
              }
            }
          }
        }
      }
      
      toast.success('Template created successfully with all lists and cards!')
      navigate(`/boards/${newBoardId}`)
    } catch (error) {
      console.error('Error creating board from template:', error)
      toast.error(`Failed to create board from template: ${error.message || 'Unknown error'}`)
    } finally {
      setCreating(false)
    }
  }

  const handlePreviewTemplate = (template) => {
    navigate(`/boards/${template.id}`)
  }

  const getRandomColor = () => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #ff8a80 0%, #ffab91 100%)'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleImageError = (templateId) => {
    setImageErrors(prev => ({
      ...prev,
      [templateId]: true
    }))
  }

  const handleOpenConfirmModal = (template) => {
    setSelectedTemplate(template)
    setBoardTitle(template.title)
    setSelectedCover(template.cover)
    setUploadedCover(null)
    setConfirmModalOpen(true)
  }

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false)
    setSelectedTemplate(null)
    setBoardTitle('')
    setSelectedCover('')
    setUploadedCover(null)
  }

  const handleCoverUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB')
        return
      }
      
      setUploadedCover(file)
      setSelectedCover(URL.createObjectURL(file))
    }
  }

  const createGradientImage = (gradient) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 800
      canvas.height = 400
      
      // Create gradient
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      
      // Parse gradient colors from CSS
      const matches = gradient.match(/rgba?\([^)]+\)|#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|\b\w+\b/g)
      if (matches && matches.length >= 2) {
        grad.addColorStop(0, matches[0])
        grad.addColorStop(1, matches[1])
      } else {
        // Fallback gradient
        grad.addColorStop(0, '#667eea')
        grad.addColorStop(1, '#764ba2')
      }
      
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      canvas.toBlob(resolve, 'image/jpeg', 0.8)
    })
  }

  const handleCreateBoard = async () => {
    if (!selectedTemplate || creating) return
    
    setCreating(true)
    try {
      const workspaceId = 'a693e862-6dd3-4f7c-b32a-f72d22a94840' // Default workspace ID
      
      // Create board from template with full structure including cover
      const createBoardDto = {
        title: boardTitle,
        description: selectedTemplate.description || `Created from template: ${selectedTemplate.title}`,
        type: 'private',
        workspaceId,
        // Include cover only if it's a valid URL (not gradient) and not uploaded file
        ...(selectedCover && !uploadedCover && selectedCover.startsWith('http') && { cover: selectedCover })
      }

      const newBoardId = await createBoardAPI(createBoardDto)
      
      // Handle cover upload (custom file or gradient)
      if (uploadedCover) {
        // Upload custom file
        try {
          const formData = new FormData()
          formData.append('file', uploadedCover)
          await uploadBoardBackgroundAPI(newBoardId, formData)
        } catch (coverError) {
          console.warn('Failed to upload custom cover:', coverError)
        }
      } else if (selectedCover && !selectedCover.startsWith('http')) {
        // Convert gradient to image and upload
        try {
          const gradientBlob = await createGradientImage(selectedCover)
          if (gradientBlob) {
            const formData = new FormData()
            formData.append('file', gradientBlob, 'gradient-cover.jpg')
            await uploadBoardBackgroundAPI(newBoardId, formData)
          }
        } catch (coverError) {
          console.warn('Failed to upload gradient cover:', coverError)
        }
      }
      
      // Create lists and cards sequentially to ensure proper order
      for (let i = 0; i < selectedTemplate.lists.length; i++) {
        const listTemplate = selectedTemplate.lists[i]
        
        // Create list with proper boardId
        const createListDto = {
          title: listTemplate.title,
          boardId: String(newBoardId) // Ensure boardId is string
        }
        
        const listResponse = await addListAPI(createListDto)
        // Extract list ID properly from response and ensure it's a string
        const newListId = String(listResponse.id)
        
        // Create cards for this list with proper listId
        for (let j = 0; j < listTemplate.cards.length; j++) {
          const cardTemplate = listTemplate.cards[j]
          
          const createCardDto = {
            title: cardTemplate.title,
            listId: newListId // Ensure listId is properly set as string according to backend API
          }
          
          const newCardResponse = await addCardAPI(createCardDto)
          const newCardId = String(newCardResponse.id)
          
          // Create checklists for this card if they exist
          if (cardTemplate.checklists && cardTemplate.checklists.length > 0) {
            for (let k = 0; k < cardTemplate.checklists.length; k++) {
              const checklistItem = cardTemplate.checklists[k]
              
              const createChecklistDto = {
                description: checklistItem,
                cardId: newCardId
              }
              
              try {
                await addChecklistAPI(createChecklistDto)
              } catch (checklistError) {
                console.warn('Failed to create checklist item:', checklistError)
                // Continue with next checklist item even if one fails
              }
            }
          }
        }
      }
      
      toast.success('Board created successfully from template!')
      handleCloseConfirmModal()
      navigate(`/boards/${newBoardId}`)
    } catch (error) {
      console.error('Error creating board from template:', error)
      toast.error(`Failed to create board from template: ${error.message || 'Unknown error'}`)
    } finally {
      setCreating(false)
    }
  }

  if (loading) {
    return <PageLoadingSpinner caption="Loading Templates..." />
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ 
      minHeight: '100vh', 
      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#f8f9fa'
    }}>
      <AppBar />
      
      {/* Header Section */}
      <Box sx={{
        background: (theme) => (
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1D2125 0%, #2C3E50 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        ),
        color: 'white',
        py: 6,
        px: 4
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            Board Templates
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
            Get started faster with a board template. Choose from our predefined templates or public boards to jumpstart your productivity.
          </Typography>
        </Container>
      </Box>

      {/* Search and Filter Section */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              )
            }}
            sx={{
              maxWidth: 500,
              mx: 'auto',
              display: 'block',
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : 'white',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#33485D' : '#f5f5f5'
                },
                '&.Mui-focused': {
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#33485D' : 'white'
                }
              }
            }}
          />
        </Box>

        {/* Category Filter */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ 
            mb: 2, 
            fontWeight: 'bold',
            color: (theme) => theme.palette.mode === 'dark' ? '#fff' : 'inherit'
          }}>
            Categories
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {templateCategories.map((category) => (
              <Chip
                key={category.id}
                icon={category.icon}
                label={category.name}
                onClick={() => setSelectedCategory(category.id)}
                color={selectedCategory === category.id ? 'primary' : 'default'}
                variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                sx={{
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  backgroundColor: selectedCategory === category.id 
                    ? undefined 
                    : (theme) => theme.palette.mode === 'dark' ? '#2f3542' : undefined,
                  color: selectedCategory === category.id 
                    ? undefined 
                    : (theme) => theme.palette.mode === 'dark' ? '#fff' : undefined,
                  borderColor: (theme) => theme.palette.mode === 'dark' && selectedCategory !== category.id 
                    ? '#555' 
                    : undefined,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                    backgroundColor: selectedCategory === category.id 
                      ? undefined 
                      : (theme) => theme.palette.mode === 'dark' ? '#33485D' : '#f5f5f5'
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ 
          mb: 4,
          borderColor: (theme) => theme.palette.mode === 'dark' ? '#555' : undefined
        }} />

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 'bold', 
              mb: 2, 
              color: (theme) => theme.palette.mode === 'dark' ? '#ccc' : '#666'
            }}>
              {searchTerm || selectedCategory !== 'all'
                ? 'No templates found'
                : 'No templates available'
              }
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your search or category filter'
                : 'Check back later for new templates'
              }
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="h5" sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              color: (theme) => theme.palette.mode === 'dark' ? '#fff' : 'inherit'
            }}>
              {selectedCategory === 'all' ? 'All Templates' : `${templateCategories.find(c => c.id === selectedCategory)?.name} Templates`}
              <Chip
                label={filteredTemplates.length}
                size="small"
                sx={{ 
                  ml: 2,
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : undefined,
                  color: (theme) => theme.palette.mode === 'dark' ? '#fff' : undefined
                }}
              />
            </Typography>
            
            <Grid container spacing={3}>
              {filteredTemplates.map((template) => (
                <Grid item xs={12} sm={6} md={4} key={template.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : 'white',
                      boxShadow: (theme) => theme.palette.mode === 'dark' 
                        ? '0 4px 12px rgba(0,0,0,0.3)' 
                        : '0 4px 12px rgba(0,0,0,0.1)',
                      border: (theme) => theme.palette.mode === 'dark' ? '1px solid #555' : 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: (theme) => theme.palette.mode === 'dark' 
                          ? '0 8px 25px rgba(0,0,0,0.4)' 
                          : '0 8px 25px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        height: 160,
                        background: imageErrors[template.id] || !template.cover 
                          ? template.fallbackColor || getRandomColor()
                          : `url(${template.cover})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0,0,0,0.4)',
                          borderRadius: 'inherit'
                        }
                      }}
                    >
                      {/* Hidden image to handle onError */}
                      {template.cover && !imageErrors[template.id] && (
                        <img
                          src={template.cover}
                          alt=""
                          style={{ display: 'none' }}
                          onError={() => handleImageError(template.id)}
                        />
                      )}
                      
                      <Chip
                        label="Template"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          backgroundColor: 'rgba(76, 175, 80, 0.9)',
                          color: 'white',
                          fontWeight: 'bold',
                          zIndex: 2
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'white',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                          px: 2,
                          position: 'relative',
                          zIndex: 2
                        }}
                      >
                        {template.title || 'Untitled Template'}
                      </Typography>
                    </CardMedia>
                    
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          height: '60px'
                        }}
                      >
                        {template.description || 'No description available for this template.'}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                        <Chip
                          icon={<StarIcon />}
                          label={`${template.lists?.length || 0} Lists`}
                          size="small"
                          variant="outlined"
                          color="primary"
                          sx={{
                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'transparent' : undefined,
                            borderColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined,
                            color: (theme) => theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined
                          }}
                        />
                        <Chip
                          icon={<VisibilityIcon />}
                          label={`${template.lists?.reduce((acc, list) => acc + (list.cards?.length || 0), 0) || 0} Cards`}
                          size="small"
                          variant="outlined"
                          color="secondary"
                          sx={{
                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'transparent' : undefined,
                            borderColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.secondary.main : undefined,
                            color: (theme) => theme.palette.mode === 'dark' ? theme.palette.secondary.main : undefined
                          }}
                        />
                      </Box>

                      <Stack direction="row" spacing={1}>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<CopyAllIcon />}
                          onClick={() => handleOpenConfirmModal(template)}
                          disabled={creating}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 'bold'
                          }}
                        >
                          Use Template
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>

      {/* Template Confirmation Modal */}
      <Modal
        open={confirmModalOpen}
        onClose={handleCloseConfirmModal}
        aria-labelledby="template-confirmation-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 600, md: 700 },
          maxHeight: '90vh',
          overflow: 'auto',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : 'white',
          borderRadius: 3,
          boxShadow: 24,
          p: 0
        }}>
          {/* Modal Header */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 3,
            borderBottom: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#555' : '#e0e0e0'}`
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Create Board from Template
            </Typography>
            <IconButton onClick={handleCloseConfirmModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Modal Content */}
          <Box sx={{ p: 3 }}>
            {selectedTemplate && (
              <>
                {/* Cover Preview */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Board Cover
                  </Typography>
                  <Box
                    sx={{
                      height: 120,
                      borderRadius: 2,
                      background: selectedCover?.startsWith('http') 
                        ? `url(${selectedCover})` 
                        : selectedCover || selectedTemplate.fallbackColor,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: (theme) => `2px solid ${theme.palette.mode === 'dark' ? '#555' : '#e0e0e0'}`,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        borderRadius: 'inherit'
                      }
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                        position: 'relative',
                        zIndex: 1
                      }}
                    >
                      {boardTitle}
                    </Typography>
                  </Box>
                </Box>

                {/* Board Title Input */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Board Title"
                    value={boardTitle}
                    onChange={(e) => setBoardTitle(e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : 'white'
                      }
                    }}
                  />
                </Box>

                {/* Cover Options */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Choose Cover
                  </Typography>
                  
                  {/* Upload Cover */}
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<ImageIcon />}
                      sx={{ mb: 2 }}
                    >
                      Upload Custom Cover
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleCoverUpload}
                      />
                    </Button>
                  </Box>

                  {/* Predefined Covers Grid */}
                  <Grid container spacing={1}>
                    {predefinedCovers.map((cover, index) => (
                      <Grid item xs={3} sm={2} key={index}>
                        <Box
                          onClick={() => {
                            setSelectedCover(cover)
                            setUploadedCover(null)
                          }}
                          sx={{
                            height: 60,
                            borderRadius: 1,
                            background: cover.startsWith('http') ? `url(${cover})` : cover,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            cursor: 'pointer',
                            border: selectedCover === cover 
                              ? '3px solid #1976d2' 
                              : (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#555' : '#e0e0e0'}`,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                              boxShadow: 2
                            }
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Template Info */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Template Details
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {selectedTemplate.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      icon={<StarIcon />}
                      label={`${selectedTemplate.lists?.length || 0} Lists`}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                    <Chip
                      icon={<VisibilityIcon />}
                      label={`${selectedTemplate.lists?.reduce((acc, list) => acc + (list.cards?.length || 0), 0) || 0} Cards`}
                      size="small"
                      variant="outlined"
                      color="secondary"
                    />
                  </Box>
                </Box>
              </>
            )}
          </Box>

          {/* Modal Footer */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            p: 3,
            borderTop: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#555' : '#e0e0e0'}`
          }}>
            <Button
              variant="outlined"
              onClick={handleCloseConfirmModal}
              disabled={creating}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreateBoard}
              disabled={creating || !boardTitle.trim()}
              startIcon={<CopyAllIcon />}
            >
              {creating ? 'Creating...' : 'Create Board'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  )
}

export default Templates
