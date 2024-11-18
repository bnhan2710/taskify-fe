import Box from '@mui/material/Box'
import List from './List/List'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
function ColumnLists({ lists }) {
  const [openNewListForm, setOpenNewListForm] = useState(false)
  const toggleOpenNewListForm = () => setOpenNewListForm(!openNewListForm)

  const [newListTitle, setNewListTitle] = useState('')

  const addNewList = () => {
    if (!newListTitle.trim()) return
    // console.log(newListTitle)
    //call api to add new list

    setNewListTitle('')
    toggleOpenNewListForm()
  }
  return (
    <SortableContext items={lists?.map((list) => list.id)} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '*::-webkit-scrollbar-track': { m: 2 }
        }}
      >
        {lists?.map((list) => (
          <List key={list.id} list={list} />
        ))}

        {/* Add New List Button or Form */}
        {!openNewListForm ? (
          <Box
            onClick={toggleOpenNewListForm}
            sx={{
              minWidth: '250px',
              maxWidth: '300px',
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff5d'
            }}
          >
            <Button
              startIcon={<AddIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
            >
              Add another list
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '300px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff5d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              id="outlined-search"
              label="Enter list title..."
              type="text"
              size="small"
              variant="outlined"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              autoFocus
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={addNewList}
                disabled={!newListTitle.trim()}
              >
                Add List
              </Button>
              <Button
                startIcon={<CloseIcon />}
                onClick={toggleOpenNewListForm}
                sx={{ color: 'white' }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ColumnLists
