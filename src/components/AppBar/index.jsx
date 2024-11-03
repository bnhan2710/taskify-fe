import { useState } from 'react'
import Box from '@mui/material/Box'
import SelectMode from '~/components/SelectMode'
import { ReactComponent as MainIcon } from '~/assets/main-logo.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineRounded'
import Profiles from './Menus/Profiles'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box sx={{
      backgroundColor:'white',
      width: '100%',
      height: (theme) => theme.taskify.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding:2,
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1D2125' : '#1565c0' )
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap : 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap : 1 }} >
          <SvgIcon component={MainIcon} inheritViewBox sx={{ color: '#9EACBA' }}/>
          <Typography variant ='span' sx={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#9EACBA' }}>
            Taskify</Typography>
        </Box>
        <Box sx ={{ display: { xs:'none', md: 'flex', gap: 1 } }}>
          <Workspaces/>
          <Recent/>
          <Starred/>
          <Templates/>
          <Button
            sx={{ bgcolor:'#00aee6', color: '#1D2125', border:'none', '&:hover':{ border:'none', bgcolor:'#9EACBA' } }}
            variant="outlined"
            startIcon={<AddToPhotosIcon/>}
          >
            Create</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color:'#9EACBA' }}>
        <TextField
          id="outlined-search"
          label="Search.."
          type="search"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize:'small', color:'#9EACBA' }}/>
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                sx={{ fontSize:'small', color: searchValue ? '#9EACBA' : 'transparent', cursor:'pointer' }}
                onClick={() => setSearchValue('')}
              />
            )
          }}
          sx={{ minWidth: 120, maxWidth: 170, '& label': { color:'#9EACBA' }, '& .MuiInputBase-root': { color:'white' } }}
        />
        <SelectMode/>

        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ cursor:'pointer' }}>
            <NotificationsIcon sx={{ color: '#9EACBA' }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Information" sx={{ cursor:'pointer', color: '#9EACBA' }}>
          <HelpOutlineIcon />
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar
