import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import Tooltip from '@mui/material/Tooltip'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCard from './ListCards/ListCard'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function List({ list }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging
  } = useSortable({ id: list.id, data: { ...list } })

  const dndkitListStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height:'100%',
    opacity: isDragging ? 0.5 : undefined
  }


  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }


  const handleClose = () => {
    setAnchorEl(null)
  }
  const orderedCards = mapOrder(list?.cards, list?.cardOrderIds, 'id')
  return (
    <div ref={setNodeRef} style = {dndkitListStyles} {...attributes} >
      <Box {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101204' : '#F4F5F7'),
          ml: 2,
          borderRadius: '12px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(1${theme.taskify.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        {/* Box list header */}
        <Box
          sx={{
            height:(theme) => theme.taskify.listHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6" sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: (theme) => (theme.palette.mode === 'dark' ? '#B6C2CF' : '#B6C2CF')
          }}>

            {list?.title}
          </Typography>
          <Box>
            <Tooltip title= "More options">
              <KeyboardArrowDownIcon
                sx={{
                  color: '#9EACBA',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#282F27',
                    borderRadius: '4px',
                    alignItems: 'center'
                  }
                }}
                id="basic-LIST-dropdown"
                aria-controls={open ? 'basic-menu-LIST-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              sx ={{
              }}
              id="basic-menu-workspaces"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-LIST-dropdown"'
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>


              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <MenuItem onClick={handleClose}>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon><DeleteOutlineIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Remove this list</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this list</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* List card */}
        <ListCard cards = {orderedCards}/>
        {/* Footer */}
        <Box
          sx={{
            height: (theme) => theme.taskify.listFooterHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button
            startIcon={<AddCardIcon />}
            width="100%"
          >Add a card </Button>
          <Tooltip title="Drag to move">
            <DragHandleIcon sx={{ cursor:'pointer' }}/>
          </Tooltip>
        </Box>
      </Box>
    </div>
  )
}

export default List