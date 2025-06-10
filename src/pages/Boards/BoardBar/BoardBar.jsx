import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { capitalizeFirstLetter } from '~/utils/formatter'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'
// import { capitalizeFirstLetter } from '~/utils/formatter'
import { useSelector } from 'react-redux'
import { selectcurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import BoardSideBar from './BoardSideBar'
import { Button } from '@mui/material'
import { updateBoard } from '~/apis'
import { useDispatch } from 'react-redux'
import { updatecurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
const MENU_STYLES ={
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiChip-icon': {
    color: 'white'
  },
  '&:hover':{
    bgcolor:'primary.50'
  }
}

function BoardBar({ board }) {
  const [open, setOpen] = useState(false)
  const [openInvite, setOpenInvite] = useState(false)
  const confirm = useConfirm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentBoard = useSelector(selectcurrentActiveBoard)
  const currentUser = useSelector(selectCurrentUser)
  const role = currentBoard?.boardUsers?.find((user) => user.id === currentUser.id)?.role
  const isBoardMember = board?.boardUsers?.some(user => user.id === currentUser.id)
  const isPublicBoard = board?.type === 'public'
  const isReadOnly = ( isPublicBoard && !isBoardMember ) || role === 'Guest'
  const isCurrentlyPublic = board?.type === 'public'
  const targetType = isCurrentlyPublic ? 'private' : 'public'
  const targetTypeLabel = isCurrentlyPublic ? 'Private' : 'Public'
  const handleToggleBoardType = () => {
    confirm({
      title: `Make ${targetTypeLabel} Board?`,
      description: `This will change the board type to ${targetTypeLabel}`,
      confirmationText: 'Yes, change it',
      confirmationButtonProps: {
        variant: 'contained',
        color: 'secondary'
      },
      cancellationText: 'Cancel',
      cancellationButtonProps: {
        variant: 'contained',
        color: 'primary'
      }
    }).then(() => {
      updateBoard(board.id, { type: targetType })
        .then(() => {
          const updatedBoard = { ...currentBoard, type: targetType }
          dispatch(updatecurrentActiveBoard(updatedBoard))
          navigate('/boards/' + updatedBoard.id)
          toast.success(`Board changed to ${targetTypeLabel} successfully!`)
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || `Failed to change board to ${targetTypeLabel}`)
        })
    }).catch(() => {
    })
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.taskify.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        padding: '0 16px',
        overflowX: 'auto',
        // bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#0D4374' : '#1565c0'),
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100, // Đảm bảo hiển thị trên cùng
        // Background trong suốt
        backgroundColor: board?.cover
          ? 'rgba(0, 0, 0, 0.4)'
          : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
        ...(isReadOnly && {
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            zIndex: 10
          },
          '& button:not(.close-button), & input, & textarea, & [role="button"]:not(.close-button-container)': {
            pointerEvents: 'none'
          },
          '& *:not(.close-button):not(.close-button-container)': {
            userSelect: 'none'
          }
        })
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={{ ...MENU_STYLES, fontSize: '1.1rem', fontWeight: 'bold', backgroundColor: 'transparent' }}
          icon={<SpaceDashboardIcon />}
          label={board?.title}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label= {capitalizeFirstLetter(board?.type)}
          clickable
          onClick={role === 'Owner' ? handleToggleBoardType : undefined} 
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Drive"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap:2 }}>
        { role === 'Owner' &&
        (<InviteBoardUser
          isSelected={true} openModal={openInvite}
          handleOpenModal={() => setOpenInvite(true)} handleCloseModal={() => setOpenInvite(false)}
          boardId={board.id} boardUsers={board?.boardUsers}/> )}
        <BoardUserGroup boardUsers={board?.boardUsers}/>
        <Button sx={MENU_STYLES} onClick={() => {setOpen(true)}}>
          <MoreHorizIcon />
        </Button>
        <BoardSideBar open={open} onClose={() => setOpen(false)} board={board}/>
      </Box>
    </Box>
  )
}

export default BoardBar
