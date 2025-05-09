import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import AddIcon from '@mui/icons-material/Add'
import Badge from '@mui/material/Badge'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { useSelector } from 'react-redux'
import { selectcurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'

function CardUserGroup({ memberIds = [], onUpdateCardMembers }) {
  const board = useSelector(selectcurrentActiveBoard)
  const boardUsers = board?.boardUsers || []
  const FE_CardMembers = boardUsers.filter(user => memberIds.includes(user.id))
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }
  const handleUpdateCardMembers = (user) => {
    const incommingMemberInfo ={
      userId: user.id,
      action: memberIds.includes(user.id) ? 'remove' : 'add'
    }
    onUpdateCardMembers(incommingMemberInfo)
  }

  return (
    <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>

      {FE_CardMembers.map((user, index) => (
        <Box key={index} sx={{ position: 'relative' }}>
          <Tooltip title={user?.displayName}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                cursor: 'pointer',
                '&:hover + .remove-button': {
                  opacity: 1
                }
              }}
              alt={user?.displayName}
              src={user?.avatar}
            />
          </Tooltip>
          <IconButton
            className="remove-button"
            onClick={() => handleUpdateCardMembers(user)}
            size="small"
            sx={{
              position: 'absolute',
              top: -5,
              right: -5,
              width: 18,
              height: 18,
              opacity: 0,
              transition: 'opacity 0.2s',
              bgcolor: 'rgba(255, 0, 0, 0.8)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 0, 0, 1)',
                opacity: 1
              },
              '& .MuiSvgIcon-root': {
                fontSize: 12
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ))}

      <Tooltip title="Add new member">
        <Box
          aria-describedby={popoverId}
          onClick={handleTogglePopover}
          sx={{
            width: 36,
            height: 36,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '50%',
            color: (theme) => theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : theme.palette.grey[200],
            '&:hover': {
              color: (theme) => theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
            }
          }}
        >
          <AddIcon fontSize="small" />
        </Box>
      </Tooltip>
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: '260px', display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {boardUsers.map((user, index) =>
            <Tooltip title={user?.displayName} key={index}>
              <Badge
                sx={{ cursor: 'pointer' }}
                overlap="rectangular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  memberIds.includes(user.id)
                    ? <CheckCircleIcon fontSize="small" sx={{ color: '#27ae60' }} />
                    : null
                }
                onClick={() => handleUpdateCardMembers(user)}
              >
                <Avatar
                  sx={{ width: 34, height: 34 }}
                  alt={user?.displayName}
                  src={user?.avatar}
                />
              </Badge>
            </Tooltip>
          )}
        </Box>
      </Popover>
    </Box>
  )
}

export default CardUserGroup
