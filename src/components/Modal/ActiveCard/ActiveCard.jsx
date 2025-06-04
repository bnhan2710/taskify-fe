import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import CancelIcon from '@mui/icons-material/Cancel'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  addChecklistAPI,
  cardMemberAPI,
  commentCardAPI, getChecklistAPI, removeCardCoverAPI, updateCardAPI,
  updateChecklistAPI, deleteChecklistAPI,
  uploadCardcoverAPI
} from '~/apis'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import { selectcurrentActiveBoard, updateCardInBoard, updatecurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import {
  clearCurrentActiveCard,
  selectCurrentActiveCard,
  updateCurrentActiveCard
} from '~/redux/activeCard/activeCardSlice'
import { singleFileValidator } from '~/utils/validators'
import CardActivitySection from './CardActivitySection'
import CardChecklist from './CardChecklist'
import CardDescriptionMdEditor from './CardDescriptionMdEditor'
import CardUserGroup from './CardUserGroup'

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  color: theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
  backgroundColor: theme.palette.mode === 'dark' ? '#2f3542' : '#091e420f',
  padding: '10px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300],
    '&.active': {
      color: theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
      backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
    }
  }
}))


function ActiveCard() {  const dispatch = useDispatch()
  const activeCard = useSelector(selectCurrentActiveCard)
  const board = useSelector(selectcurrentActiveBoard)

  const handleCloseModal = () => {
  try {
    const newBoard = cloneDeep(board)
    const listContainingCard = newBoard.lists.find(list =>
      list.cards.some(card => card.id === activeCard.id)
    )

    if (listContainingCard) {
      const cardToUpdate = listContainingCard.cards.find(card => card.id === activeCard.id)
      if (cardToUpdate) {
        cardToUpdate.checklists = activeCard.checklists
        cardToUpdate.cover = activeCard.cover
        cardToUpdate.members = activeCard.members
        cardToUpdate.comments = activeCard.comments
        dispatch(updatecurrentActiveBoard(newBoard))
      }
    }

    dispatch(clearCurrentActiveCard())
  } catch (error) {
    console.error('Error closing modal:', error)
    toast.error('Failed to close card')
  }
  }
  // BUG
  const onUpdateCardTitle = (newTitle) => {
    if (newTitle === activeCard.title) return
    callAPIupdateCard({ title: newTitle.trim() })
  }

  const onUpdateCardDescription = (newDescription) => {
    if (newDescription === activeCard.description) return
    callAPIupdateCard({ description: newDescription })
  }

  const callAPIupdateCard = (updateCardDto) => {
    const updateDto = { ...updateCardDto, listId:activeCard.listId }
    updateCardAPI(activeCard.id, updateDto)
    dispatch(updateCurrentActiveCard({ ...activeCard, ...updateDto }))
    dispatch(updateCardInBoard({ ...activeCard, ...updateDto }))
  }

  const onUploadCardCover = (event) => {
    const file = event.target?.files[0]
    if (!file) return
    const error = singleFileValidator(file)
    if (error) {
      toast.error(error)
      return
    }
    let reqData = new FormData()
    reqData.append('cardCover', file)
    toast.promise(
      uploadCardcoverAPI(reqData, activeCard.id),
      {
        pending: 'Uploading cover image...',
        success: 'Cover image uploaded successfully',
        error: 'Failed to upload cover image'
      }
    ).then(response => {
      const coverUrl = response.data.cover
      dispatch(updateCurrentActiveCard({
        ...activeCard,
        cover: coverUrl
      }))
      updateCardInBoardState(coverUrl)
    }).catch(error => {
      console.error('Error uploading card cover:', error)
    })
  }
  const updateCardInBoardState = (coverUrl) => {
    const newBoard = cloneDeep(board)
    const listContainingCard = newBoard.lists.find(list =>
      list.cards.some(card => card.id === activeCard.id)
    )
    if (listContainingCard) {
      const cardToUpdate = listContainingCard.cards.find(card => card.id === activeCard.id)
      if (cardToUpdate) {
        cardToUpdate.cover = coverUrl
        dispatch(updatecurrentActiveBoard(newBoard))
      }
    }
  }
  const onRemoveCardCover = () => {
    if (!activeCard?.cover) return

    toast.promise(
      removeCardCoverAPI(activeCard.id),
      {
        pending: 'Removing cover image...',
        success: 'Cover image removed successfully',
        error: 'Failed to remove cover image'
      }
    ).then(() => {
      dispatch(updateCurrentActiveCard({
        ...activeCard,
        cover: null
      }))
      updateCardInBoardState(null)
    }).catch(error => {
      console.error('Error removing card cover:', error)
    })
  }

  const onAddCardComment = async (commentToAdd) => {
    const commentDto = {
      ...commentToAdd,
      cardId: activeCard.id
    }
    const newComment = await commentCardAPI(commentDto)
    dispatch(updateCurrentActiveCard({
      ...activeCard,
      comments: [...activeCard.comments, newComment]
    }))
  }

  const onUpdateCardMembers = async (incommingMemberInfo) => {
    try {
      const { userId, action } = incommingMemberInfo
      await cardMemberAPI(activeCard.id, { userId, action })

      let updatedMembers = [...(activeCard.members || [])]

      if (action === 'add') {
        if (!updatedMembers.includes(userId)) {
          updatedMembers.push(userId)
        }
      } else if (action === 'remove') {
        updatedMembers = updatedMembers.filter(id => id !== userId)
      }

      dispatch(updateCurrentActiveCard({
        ...activeCard,
        members: updatedMembers
      }))

      // Update the card in the board state
      const newBoard = cloneDeep(board)
      const listContainingCard = newBoard.lists.find(list =>
        list.cards.some(card => card.id === activeCard.id)
      )

      if (listContainingCard) {
        const cardToUpdate = listContainingCard.cards.find(card => card.id === activeCard.id)
        if (cardToUpdate) {
          cardToUpdate.members = updatedMembers
          // Dispatch the updated board state
          dispatch(updatecurrentActiveBoard(newBoard))
        }
      }
    } catch (error) {
      console.error('Error updating card members:', error)
      toast.error('Failed to update card member')
    }  
  }

  const [checklists, setChecklists] = useState([])
  const handleUpdateChecklist = async (updatedChecklist) => {
    try {
        const existingChecklist = updatedChecklist.items
        const updateResponse = await updateChecklistAPI(existingChecklist.id, {
          description: existingChecklist.description,
          isDone: existingChecklist.isDone
        })
        
        if (updateResponse && updateResponse.data) {
          setChecklists([updateResponse.data])
        }
        const fetch = await getChecklistAPI(activeCard.id)
        if (fetch && fetch.data) {
          setChecklists(fetch.data || [])
        } else {
          setChecklists([])
        }
        dispatch(updateCurrentActiveCard({
          ...activeCard,
          checklists: [...fetch.data]
        }));
    } catch (error) {
      console.error('Error handling checklist:', error)
      toast.error('Failed to update checklist')
    }
  }

  const handleCreateChecklist = async (data) => {
    try {
      const description = data?.description || 'TODO';
      
      const response = await addChecklistAPI({
        cardId: activeCard.id,
        description: description
      })
      if (response) {
        setChecklists([response.data]);
        toast.success('Checklist created successfully');
      }
      const fetch = await getChecklistAPI(activeCard.id)
        if (fetch && fetch.data) {
          setChecklists(fetch.data || [])
        } else {
          setChecklists([])
        }
        dispatch(updateCurrentActiveCard({
          ...activeCard,
          checklists: [...fetch.data]
        }));
    } catch (error) {
      console.error('Error creating checklist:', error);
      toast.error('Failed to create checklist');
    }
  }

  const handleDeleteChecklist = async (checklistId) => {
  try {
    await deleteChecklistAPI(checklistId);
    setChecklists(prevChecklists => prevChecklists.filter(c => c.id !== checklistId));
    const fetch = await getChecklistAPI(activeCard.id)
      if (fetch && fetch.data) {
        setChecklists(fetch.data || [])
      } else {
        setChecklists([])
      }
      dispatch(updateCurrentActiveCard({
        ...activeCard,
        checklists: [...fetch.data]
      }));
    } catch (error) {
      console.error('Error deleting checklist:', error);
      toast.error('Failed to delete checklist');
    }
  }

  useEffect(() => {
    const loadChecklists = async () => {
      if (!activeCard?.id) return
      try {
        const response = await getChecklistAPI(activeCard.id)
        if (response && response.data) {
          setChecklists(response.data || [])
        } else {
          setChecklists([])
        }
        dispatch(updateCurrentActiveCard({
          ...activeCard,
          checklists: response.data
        }));
      } catch (error) {
        console.error('Error loading checklists:', error)
        setChecklists([])
      }
    }
    loadChecklists()
  }, [activeCard?.id])

  return (
    <Modal
      disableScrollLock
      open={true}
      onClose={handleCloseModal} // Sử dụng onClose trong trường hợp muốn đóng Modal bằng nút ESC hoặc click ra ngoài Modal
      sx={{ overflowY: 'auto' }}>
      <Box sx={{
        position: 'relative',
        width: 900,
        maxWidth: 900,
        bgcolor: 'white',
        boxShadow: 24,
        borderRadius: '8px',
        border: 'none',
        outline: 0,
        padding: '40px 20px 20px',
        margin: '50px auto',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
      }}>
        <Box sx={{
          position: 'absolute',
          top: '12px',
          right: '10px',
          cursor: 'pointer'
        }}>
          <CancelIcon color="error" sx={{ '&:hover': { color: 'error.light' } }} onClick={handleCloseModal} />
        </Box>
        {activeCard?.cover &&
        <Box sx={{ position: 'relative', mb: 4 }}>
          <img
            style={{ width: '100%', height: '320px', borderRadius: '6px', objectFit: 'cover' }}
            src={activeCard?.cover}
            alt="card-cover"
          />
          <Tooltip title="Remove cover">
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteOutlineIcon />}
              onClick={onRemoveCardCover}
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                opacity: 0.8,
                '&:hover': { opacity: 1 }
              }}
            >
              Remove
            </Button>
          </Tooltip>
        </Box>
        }
        <Box sx={{ mb: 1, mt: -3, pr: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CreditCardIcon />
          <ToggleFocusInput
            inputFontSize='22px'
            value={activeCard?.title}
            onChangedValue={onUpdateCardTitle} />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid xs={12} sm={9}>
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Members</Typography>
              <CardUserGroup
                memberIds={activeCard?.members}
                onUpdateCardMembers={onUpdateCardMembers}
              />
            </Box>            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SubjectRoundedIcon />
                <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>Description</Typography>
              </Box>
              <CardDescriptionMdEditor
                cardDescriptionProp={activeCard?.description}
                handleUpdateCardDescription={onUpdateCardDescription}
              />
            </Box>            
            
            {checklists.length >= 0 && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <TaskAltOutlinedIcon />
                  <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>
                    {checklists[0]?.title || 'ToDo'} 
                  </Typography>
                </Box>
                <CardChecklist
                  checklist={checklists}
                  onUpdateChecklist={handleUpdateChecklist}
                  onAddChecklist={handleCreateChecklist}
                  onDeleteChecklist={handleDeleteChecklist}
                />
              </Box>
            )}
            

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <DvrOutlinedIcon />
                <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>Activity</Typography>
              </Box>
              <CardActivitySection
                cardComments={activeCard?.comments}
                onAddCardComment = {onAddCardComment}
              />
            </Box>
          </Grid>

          {/* Right side */}
          <Grid xs={12} sm={3}>
            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Add To Card</Typography>
            <Stack direction="column" spacing={1}>
              <SidebarItem className="active">
                <PersonOutlineOutlinedIcon fontSize="small" />
                Join
              </SidebarItem>
              <SidebarItem className="active" component="label">
                <ImageOutlinedIcon fontSize="small" />
                Cover
                <VisuallyHiddenInput type="file" onChange={onUploadCardCover} />
              </SidebarItem>

              <SidebarItem><AttachFileOutlinedIcon fontSize="small" />Attachment</SidebarItem>
              <SidebarItem><LocalOfferOutlinedIcon fontSize="small" />Labels</SidebarItem>              
              <SidebarItem>
                Checklist
              </SidebarItem>
              <SidebarItem><WatchLaterOutlinedIcon fontSize="small" />Dates</SidebarItem>
              <SidebarItem><AutoFixHighOutlinedIcon fontSize="small" />Custom Fields</SidebarItem>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Power-Ups</Typography>
            <Stack direction="column" spacing={1}>
              <SidebarItem><AspectRatioOutlinedIcon fontSize="small" />Card Size</SidebarItem>
              <SidebarItem><AddToDriveOutlinedIcon fontSize="small" />Google Drive</SidebarItem>
              <SidebarItem><AddOutlinedIcon fontSize="small" />Add Power-Ups</SidebarItem>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Actions</Typography>
            <Stack direction="column" spacing={1}>
              <SidebarItem><ArrowForwardOutlinedIcon fontSize="small" />Move</SidebarItem>
              <SidebarItem><ContentCopyOutlinedIcon fontSize="small" />Copy</SidebarItem>
              <SidebarItem><AutoAwesomeOutlinedIcon fontSize="small" />Make Template</SidebarItem>
              <SidebarItem><ArchiveOutlinedIcon fontSize="small" />Archive</SidebarItem>
              <SidebarItem><ShareOutlinedIcon fontSize="small" />Share</SidebarItem>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ActiveCard
