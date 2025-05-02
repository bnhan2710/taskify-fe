import { useState, useEffect } from 'react'
import moment from 'moment'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DoneIcon from '@mui/icons-material/Done'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import { getNotificationsAPI, updateNotificationAPI } from '~/apis'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import CircularProgress from '@mui/material/CircularProgress'
import { useDebounceFn } from '~/customHooks/useDebounceFn'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const BOARD_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const open = Boolean(anchorEl)

  const fetchNotificationsFromAPI = async () => {
    if (!currentUser?.id || loading) return

    try {
      setLoading(true)
      setError(null)
      const data = await getNotificationsAPI()
      setNotifications(data || [])
    } catch (err) {
      console.error('Error fetching notifications:', err)
      setError('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotificationsFromAPI()
    const intervalId = setInterval(() => {
      fetchNotificationsFromAPI()
    }, 10000)

    return () => clearInterval(intervalId)
  }, [currentUser?.id])

  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const debouncedUpdateBoardInvitation = useDebounceFn(async (notificationId, status, boardId) => {
    try {
      setLoading(true)
      const updatedNotification = await updateNotificationAPI(notificationId, status)

      if (status === BOARD_INVITATION_STATUS.ACCEPTED) {
        toast.success('Invitation accepted successfully')

        // Close the notification dropdown
        handleClose()

        // Navigate to the board if boardId is available
        if (boardId) {
          navigate(`/boards/${boardId}`)
        }
      } else if (status === BOARD_INVITATION_STATUS.REJECTED) {
        toast.info('Invitation rejected')
      }

      fetchNotificationsFromAPI()
    } catch (error) {
      console.error('Error updating notification:', error)
      toast.error('Failed to update invitation status')
    } finally {
      setLoading(false)
    }
  }, 300)

  const updateBoardInvitation = (notificationId, status, notification) => {
    const boardId = notification.boardId
    debouncedUpdateBoardInvitation(notificationId, status, boardId)
  }

  const unreadCount = notifications.filter(notification =>
    notification.status === BOARD_INVITATION_STATUS.PENDING
  ).length

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="warning"
          badgeContent={unreadCount > 0 ? unreadCount : null}
          variant={unreadCount > 0 ? 'standard' : 'dot'}
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-notification"
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon sx={{
            color: 'white'
          }} />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="basic-notification-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
      >
        {loading && (
          <MenuItem sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <CircularProgress size={24} />
          </MenuItem>
        )}

        {error && (
          <MenuItem sx={{ color: 'error.main' }}>
            {error}
          </MenuItem>
        )}

        {!loading && !error && notifications.length === 0 && (
          <MenuItem sx={{ minWidth: 250 }}>
            <Typography>You do not have any new notifications.</Typography>
          </MenuItem>
        )}

        {!loading && !error && notifications.map((notification, index) => (
          <Box key={notification.id || index}>
            <MenuItem sx={{
              minWidth: 250,
              maxWidth: 400,
              overflowY: 'auto'
            }}>
              <Box sx={{ maxWidth: '100%', wordBreak: 'break-word', whiteSpace: 'pre-wrap', display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box><GroupAddIcon fontSize="small" /></Box>
                  <Box>
                    <Typography variant="span" sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                      {notification.message}
                    </Typography>
                  </Box>
                </Box>

                {notification.status === BOARD_INVITATION_STATUS.PENDING && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                    <Button
                      className="interceptor-loading"
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => updateBoardInvitation(notification.id, BOARD_INVITATION_STATUS.ACCEPTED, notification)}
                    >
                      Accept
                    </Button>
                    <Button
                      className="interceptor-loading"
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => updateBoardInvitation(notification.id, BOARD_INVITATION_STATUS.REJECTED, notification)}
                    >
                      Reject
                    </Button>
                  </Box>
                )}

                {notification.status === BOARD_INVITATION_STATUS.ACCEPTED && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                    <Chip icon={<DoneIcon />} label="Accepted" color="success" size="small" />
                  </Box>
                )}

                {notification.status === BOARD_INVITATION_STATUS.REJECTED && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                    <Chip icon={<NotInterestedIcon />} label="Rejected" size="small" />
                  </Box>
                )}

                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="span" sx={{ fontSize: '13px' }}>
                    {moment(notification.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {index !== (notifications.length - 1) && <Divider />}
          </Box>
        ))}
      </Menu>
    </Box>
  )
}

export default Notifications
