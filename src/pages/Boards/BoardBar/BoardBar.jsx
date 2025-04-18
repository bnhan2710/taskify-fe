import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { capitalizeFirstLetter } from '~/utils/formatter'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'
// import { capitalizeFirstLetter } from '~/utils/formatter'

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

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        width: '100%',
        height: (theme) => theme.taskify.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        padding: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#0D4374' : '#1565c0'),
        opacity: 0.9
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
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Drive"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap:2 }}>
        {/* handle invite board user */}
        <InviteBoardUser boardId = {board.id}/>
        <BoardUserGroup boardUsers={board?.boardUsers}/>
        <MoreHorizIcon/>
      </Box>
    </Box>
  )
}

export default BoardBar
