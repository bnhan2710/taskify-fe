import { useState } from 'react'
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
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import ListCard from './ListCards/ListCard'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import { useSortable } from '@dnd-kit/sortable'
import { useConfirm } from 'material-ui-confirm'
import { CSS } from '@dnd-kit/utilities'
import { addCardAPI, removeListAPI, updateBoard } from '~/apis'
import { cloneDeep } from 'lodash'
import { selectcurrentActiveBoard, updatecurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateList } from '~/apis'

function List({ list, isReadOnly }) {
  const dispatch = useDispatch()
  const board = useSelector(selectcurrentActiveBoard)

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

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const [newCardTitle, setNewCardTitle] = useState('')

  const addNewCard = async () => {
    if (!newCardTitle.trim()) return
    const newCardDto = {
      title: newCardTitle.trim(),
      listId: list.id
    }
    const createdCard = await addCardAPI(newCardDto)
    const newBoard = cloneDeep(board)
    const listUpdated = newBoard.lists.find(list => list.id === newCardDto.listId)
    if (listUpdated) {
      if (listUpdated.cards.some(card => card.FE_placeholder)) {
        listUpdated.cards = [createdCard]
        listUpdated.cardOrderIds = [createdCard.id]
      } else {
        listUpdated.cards.push(createdCard)
        listUpdated.cardOrderIds.push(createdCard.id)
      }
    }
    dispatch(updatecurrentActiveBoard(newBoard))
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }
  const deleteList = async(listId) => {
    // update board state
    const newBoard = cloneDeep(board)
    newBoard.lists = newBoard.lists.filter(list => list.id !== listId)
    newBoard.listOrderIds = newBoard.listOrderIds.filter(id => id !== listId)
    dispatch(updatecurrentActiveBoard(newBoard))
    // call api delete list
    removeListAPI(listId).then(res => {
      toast.success(`${res.message}`)
    })
    await updateBoard(board.id, { listOrderIds: newBoard.listOrderIds })
  }

  //handle delete list
  const confirmDelete = useConfirm()

  const handleDeleteList = () => {
    confirmDelete({
      title: 'Delete this List?',
      description: 'This action will permanently delete this list and all the cards in it. Please input the list title to confirm.',
      confirmationText: 'Yes, delete it',
      confirmationButtonProps: {
        variant: 'contained',
        color: 'error'
      },
      cancellationText: 'Cancel',
      cancellationButtonProps: {
        variant: 'contained',
        color: 'primary'
      },
      confirmationKeyword: `${list.title}`
    }).then(() => {
      deleteList(list.id)
    }
    ).catch(() => {})
  }

  const onUpdateListTitle = (newTitle) => {
    //call api update list
    updateList(list.id, { title: newTitle }).then(() => {
      //update board state
      const newBoard = cloneDeep(board)
      const listUpdated = newBoard.lists.find(list => list.id === list.id)
      if (listUpdated) {
        listUpdated.title = newTitle
      }
      dispatch(updatecurrentActiveBoard(newBoard))
    })
  }

  const orderedCards = list.cards
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
            justifyContent: 'space-between',
            pointerEvents: isReadOnly ? 'auto' : 'auto',
            '& .MuiInputBase-root': isReadOnly ? {
              pointerEvents: 'none',
              cursor: 'default'
            } : {}
          }}
        >
          <ToggleFocusInput
            value = {list.title}
            onChangedValue={onUpdateListTitle}
            data-no-dnd = "true"
          />
          <Box>
            <Tooltip 
              title={!isReadOnly ? "More options" : ""}
              sx={{
                pointerEvents: isReadOnly ? 'none' : 'auto'
              }}
            >
              <KeyboardArrowDownIcon
                sx={{
                  color: '#9EACBA',
                  cursor: 'pointer',
                  pointerEvents: isReadOnly ? 'none' : 'auto',
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
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-LIST-dropdown"'
              }}
            >
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-card-icon': {
                      color: 'success.light'
                    }
                  }
                }}
                onClick={toggleOpenNewCardForm}
              >
                <ListItemIcon>
                  <AddCardIcon className='add-card-icon' fontSize="small" />
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
              <MenuItem onClick={handleDeleteList}
                sx={{
                  '&:hover': {
                    color: 'red',
                    '& .delete-forever-icon': {
                      color: 'red'
                    }
                  }
                }}>
                <ListItemIcon><DeleteOutlineIcon className="delete-forever-icon" fontSize="small" /></ListItemIcon>
                <ListItemText>Delete this list</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}
              >
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this list</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* List card */}
        <ListCard cards = {orderedCards} isReadOnly={isReadOnly}/>
        {/* Footer */}
        <Box
          sx={{
            height: (theme) => theme.taskify.listFooterHeight,
            p: 2
          }}
        >
          { !isReadOnly && (
            <>
            {!openNewCardForm
              ?<Box sx ={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Button
                  startIcon={<AddCardIcon/>} 
                  onClick={toggleOpenNewCardForm} 
                  width="100%" 
                > 
                  Add a card 
                </Button>
                <Tooltip title="Drag to move">
                  <DragHandleIcon sx={{ cursor:'pointer' }}/>
                </Tooltip>
              </Box>:
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center', // Căn giữa theo chiều dọc
                  gap: 1,
                  justifyContent: 'space-between' // Căn đều
                }}
              >
                <TextField
                  id="outlined-search"
                  label="Enter card title..."
                  type="text"
                  size="small"
                  variant="outlined"
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  autoFocus
                  sx={{
                    flex: 1,
                    '& label': {
                      color: 'text.primary'
                    },
                    '& label.Mui-focused': {
                      color: (theme) => theme.palette.primary.main
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: (theme) => theme.palette.primary.main
                      },
                      '&:hover fieldset': {
                        borderColor: (theme) => theme.palette.primary.main
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: (theme) => theme.palette.primary.main
                      }
                    },
                    '& .MuiOutlinedInput-input': {
                      borderRadius: 1
                    }
                  }}
                />
               <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Button
                    className='interceptor-loading'
                    variant="contained"
                    color="primary"
                    onClick={addNewCard}
                    disabled={!newCardTitle.trim()}
                    sx={{
                      textTransform: 'none',
                      minWidth: '60px'
                    }}
                  >
                    Add
                  </Button>

                  <Button
                    size="small"
                    onClick={toggleOpenNewCardForm}
                    sx={{
                      minWidth: '40px',
                      color: (theme) => theme.palette.grey[600],
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.grey[200]
                      }
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Button>
                </Box>
              </Box>
            }
            </>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default List