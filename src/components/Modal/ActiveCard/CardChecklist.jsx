import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import LinearProgress from '@mui/material/LinearProgress'

function CardChecklist({ checklist, onUpdateChecklist }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItemText, setNewItemText] = useState('')

  // Calculate progress
  const items = checklist?.items || []
  const totalItems = items.length
  const completedItems = items.filter(item => item.isDone)?.length || 0
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

  return (
    <Box sx={{ mt: 2 }}>
      {/* Progress bar */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2">
            {completedItems}/{totalItems}
          </Typography>
          <Typography variant="body2">
            {Math.round(progress)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 1,
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#5BA4CF'
            }
          }}
        />
      </Box>

      {/* Checklist items */}
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <Checkbox
            checked={item.isDone}
            onChange={() => {
              const updatedItems = [...items]
              updatedItems[index] = {
                ...item,
                isDone: !item.isDone
              }
              onUpdateChecklist({
                ...checklist,
                items: updatedItems
              })
            }}
            sx={{ 
              '&.Mui-checked': {
                color: '#0C66E4'
              }
            }}
          />
          <Typography 
            sx={{
              flexGrow: 1,
              fontSize: '14px',
              textDecoration: item.isDone ? 'line-through' : 'none'
            }}
          >
            {item.description}
          </Typography>
        </Box>
      ))}

      {/* Add item section */}
      {!showAddForm ? (
        <Button
          startIcon={<AddIcon />}
          onClick={() => setShowAddForm(true)}
          sx={{
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          Add an item
        </Button>
      ) : (
        <Box sx={{ mt: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Add an item"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newItemText.trim()) {
                onUpdateChecklist({
                  ...checklist,  
                  items: [...items, { description: newItemText.trim(), isDone: false }]
                })
                setNewItemText('')
                setShowAddForm(false)
              }
            }}
            autoFocus
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
            variant="contained"
            size="small"
            onClick={() => {
                if (!newItemText.trim()) return
                onUpdateChecklist({
                description: newItemText.trim(),  // chỉ truyền description và isDone
                isDone: false
                })
                setNewItemText('')
                setShowAddForm(false)
            }}
            sx={{ backgroundColor: '#0C66E4' }}
            >
            Add
            </Button>
            <Button
              size="small"
              onClick={() => {
                setShowAddForm(false)
                setNewItemText('')
              }}
              sx={{
                textTransform: 'none'
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CardChecklist