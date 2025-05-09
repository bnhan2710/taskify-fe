import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SettingsIcon from '@mui/icons-material/Settings'
import WallpaperIcon from '@mui/icons-material/Wallpaper'
import LabelIcon from '@mui/icons-material/Label'
import HistoryIcon from '@mui/icons-material/History'
import ArchiveIcon from '@mui/icons-material/Archive'
import VisibilityIcon from '@mui/icons-material/Visibility'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import EmailIcon from '@mui/icons-material/Email'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { closeBoardAPI } from '~/apis'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updatecurrentActiveBoard, selectcurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'
import InviteBoardUser from './InviteBoardUser'

export default function BoardSideBar ({ open, onClose, board }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentBoard = useSelector(selectcurrentActiveBoard)
  const currentUser = useSelector(selectCurrentUser)
  const role = currentBoard?.boardUsers?.find((user) => user.id === currentUser.id)?.role
  const [isInviteUserOpen, setInviteUserOpen] = useState(false)
  const [openInvite, setOpenInvite] = useState(false)
  const confirmDelete = useConfirm()

  const drawerItems = [
    { icon: <PersonAddAltIcon />, label: 'Share' },
    { icon: <SettingsIcon />, label: 'Setting' },
    { icon: <WallpaperIcon />, label: 'Change wallpaper' },
    { icon: <LabelIcon />, label: 'Label' },
    { icon: <HistoryIcon />, label: 'Work' },
    { icon: <ArchiveIcon />, label: 'Archived items' },
    { icon: <VisibilityIcon />, label: 'Monitor' },
    { icon: <FileCopyIcon />, label: 'Copy information table' },
    { icon: <EmailIcon />, label: 'Email to board setup' },
    {
      icon: <CloseFullscreenIcon />,
      label: role === 'Owner' ? 'Close this board' : 'Quit this board'
    }
  ]
  const filteredDrawerItems = drawerItems.filter((item) => {
    if (role !== 'Owner' &&
       (item.label === 'Share' || item.label === 'Quit this board' || item.label === 'Change wallpaper' )) {
      return false
    }
    return true
  })
  const handleDeleteBoard = () => {
    confirmDelete({
      title: 'Close this board?',
      description: 'You can find and reopen closed boards at the bottom of your boards page .',
      confirmationText: 'Yes, delete it',
      confirmationButtonProps: {
        variant: 'contained',
        color: 'error'
      },
      cancellationText: 'Cancel',
      cancellationButtonProps: {
        variant: 'contained',
        color: 'primary'
      }
    }).then(() => {
      closeBoardAPI(currentBoard.id)
        .then(() => {
          toast.success(`Board deleted: ${currentBoard.title}`)
          dispatch(updatecurrentActiveBoard(null))
          navigate('/boards')
        })
        .catch(() => {
          toast.error('Failed to delete board')
        })
    }).catch(() => {
    })
  }

  const handleAction = (label) => {
    switch (label) {
    case 'Close this board':
      handleDeleteBoard()
      break
    case 'Share':
      // handleShare()
      setInviteUserOpen(true)
      setOpenInvite(true)
      break
    default:
      // handle other actions
      break
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 320,
          backgroundColor: '#2c2f35',
          color: '#fff'
        }
      }}
    >
      {isInviteUserOpen && (
        <InviteBoardUser 
          isSelected={!isInviteUserOpen} openModal={openInvite} 
          handleOpenModal={() => setOpenInvite(true)} handleCloseModal={() => setOpenInvite(false)}
          boardId={board.id} boardUsers={board?.boardUsers}/>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 2,
          borderBottom: '1px solid #444'
        }}
      >
        <Typography variant="h6">Menu</Typography>
        <IconButton onClick={onClose} sx={{ color: '#fff' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ overflowY: 'auto', flex: 1 }}>
        {filteredDrawerItems.map((item, index) => (
          <ListItem button key={index} onClick={() => handleAction(item.label)}>
            <ListItemIcon sx={{ color: '#bbb' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
            {item.warning && (
              <Typography color="warning.main" fontWeight="bold">
                ⚠
              </Typography>
            )}
            {item.upgrade && (
              <Typography
                variant="caption"
                sx={{ color: 'violet', ml: 1, fontWeight: 'bold' }}
              >
                Upgrade
              </Typography>
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
