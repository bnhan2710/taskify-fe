import {
    Box,
    Button,
    Popover,
    TextField,
    Typography
} from '@mui/material'
import { useState } from 'react'

function CreateChecklistModal({ anchorEl, onClose, onCreateChecklist }) {
  const [title, setTitle] = useState('')
  const open = Boolean(anchorEl)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onCreateChecklist(title)
    setTitle('')
    onClose()
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box sx={{ p: 2, width: 300 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Add Checklist Group</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            size="small"
            label="Checklist Title"
            placeholder="e.g., Todo List, Requirements..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained"
              disabled={!title.trim()}
            >
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </Popover>
  )
}

export default CreateChecklistModal