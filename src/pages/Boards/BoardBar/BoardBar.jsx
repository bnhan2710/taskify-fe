import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { capitalizeFirstLetter } from '~/utils/formatter'

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
          // label= {capitalizeFirstLetter(board?.type)}
          label="Public"
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
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
        <AvatarGroup
          max={5}
          sx = {{
            '& .MuiAvatar-root':{
              width:34,
              height:34,
              fontSize:16,
              border: 'none',
              color:'white',
              cursor:'pointer',
              '&:first-of-type':{ color:'#a4b0be' }
            }
          }}
        >
          <Tooltip title ="Bao Nhan">
            <Avatar
              alt="Remy Sharp"
              src="https://avatars.githubusercontent.com/u/130585782?v=4" />
          </Tooltip>
          <Tooltip title ="Bao Nhan">
            <Avatar
              alt="Remy Sharp"
              src="https://avatars.githubusercontent.com/u/130585782?v=4" />
          </Tooltip>
          <Tooltip title ="Bao Nhan">
            <Avatar
              alt="Remy Sharp"
              src="https://avatars.githubusercontent.com/u/130585782?v=4" />
          </Tooltip>
          <Tooltip title ="Bao Nhan">
            <Avatar
              alt="Remy Sharp"
              src="https://avatars.githubusercontent.com/u/130585782?v=4" />
          </Tooltip>
          <Tooltip title ="Bao Nhan">
            <Avatar
              alt="Remy Sharp"
              src="https://avatars.githubusercontent.com/u/130585782?v=4" />
          </Tooltip>
          <Tooltip title ="Bao Nhan">
            <Avatar
              alt="Remy Sharp"
              src="https://avatars.githubusercontent.com/u/130585782?v=4" />
          </Tooltip>
          <Tooltip title ="Bao Nhan">
            <Avatar
              alt="Remy Sharp"
              src="https://avatars.githubusercontent.com/u/130585782?v=4" />
          </Tooltip>
        </AvatarGroup>
        <Button sx={{ display:'flex', gap:0.5, color:'white', borderColor:'white', '&:hover':{ borderColor:'white' } }} variant="outlined"><PersonAddAltIcon size="small" />Share</Button>
        <MoreHorizIcon/>
      </Box>
    </Box>
  )
}

export default BoardBar
