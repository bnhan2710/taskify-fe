import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const confirmLogout = useConfirm()
  const handleLogout = () => {
    confirmLogout({
      title: 'Logout your account?',
      confirmationText: 'Confirm',
      confirmationButtonProps: {
        variant: 'contained',
        color: 'error'
      },
      cancellationText: 'Cancel',
      cancellationButtonProps: {
        variant: 'contained',
        color: 'info'
      }
    })
      .then(() => {
        dispatch(logoutUserAPI())
      }).catch(() => {} )
  }

  return (
    <Box>
      <Tooltip title="Account settings" arrow>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            ml: 1,
            padding: 0,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              bgcolor: 'transparent'
            }
          }}
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              border: '2px solid #f0f0f0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            alt={currentUser?.displayName || 'User'}
            src={currentUser?.avatar}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 220,
            borderRadius: 2,
            mt: 1.5,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{ width: 48, height: 48, mr: 2 }}
            alt={currentUser?.displayName || 'User'}
            src={currentUser?.avatar}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
              {currentUser?.displayName || 'User'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.2 }}>
              {currentUser?.email || 'user@example.com'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Link to="/settings/account" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem sx={{
            py: 1.2,
            borderRadius: 1,
            mx: 1,
            '&:hover': {
              color: 'primary.main',
              backgroundColor: 'rgba(25, 118, 210, 0.08)'
            }
          }}>
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>
        </Link>

        <MenuItem sx={{
          py: 1.2,
          borderRadius: 1,
          mx: 1,
          '&:hover': {
            color: 'primary.main',
            backgroundColor: 'rgba(25, 118, 210, 0.08)'
          }
        }}>
          <ListItemIcon>
            <Settings sx={{ color: 'action.active' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1.2,
            borderRadius: 1,
            mx: 1,
            '&:hover': {
              color: 'error.main',
              backgroundColor: 'rgba(211, 47, 47, 0.08)'
            }
          }}
        >
          <ListItemIcon>
            <Logout sx={{ color: 'error.main' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles