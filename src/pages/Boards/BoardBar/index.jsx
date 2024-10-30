import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
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
const MENU_STYLES ={
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiChip-icon': {
    color: 'primary.main'
  },
  '&:hover':{
    bgcolor:'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        padding: 2,
        overflowX: 'auto',
        borderTop: '1px solid #00bfa5'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="Bao Nhan Board"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Workspace visible"
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
          max={3}
          sx = {{
            '& .MuiAvatar-root':{
              width:34,
              height:34,
              fontSize:16
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
        </AvatarGroup>
        <Button sx={{ display:'flex', gap:0.5 }} variant="outlined"><PersonAddAltIcon size="small" />Share</Button>
        <MoreHorizIcon/>
      </Box>
    </Box>
  )
}

export default BoardBar
