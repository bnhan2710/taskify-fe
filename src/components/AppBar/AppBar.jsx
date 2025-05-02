import { useState } from 'react'
import Box from '@mui/material/Box'
import SelectMode from '~/components/SelectMode/SelectMode'
import { ReactComponent as MainIcon } from '~/assets/main-logo.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import AppsIcon from '@mui/icons-material/Apps'
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
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'


function AppBar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.taskify.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 2,
      gap: 2,
      overflowX: 'auto',
      background: (theme) => (
        theme.palette.mode === 'dark'
          ? 'linear-gradient(90deg, #1D2125 0%, #2C3E50 100%)'
          : 'linear-gradient(90deg, #0B4F8C 0%, #0078D4 100%)'
      ),
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 1100
    }}>
      {/* Left section with logo and navigation */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2.5
      }}>
        <Tooltip title="Board List" arrow>
          <Link to={'/boards'} style={{ textDecoration: 'none' }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}>
              <AppsIcon
                sx={{
                  color: '#FFF',
                  fontSize: 24,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
              />
            </Box>
          </Link>
        </Tooltip>

        <Tooltip title="Home" arrow>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              padding: '4px 8px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}>
              <SvgIcon
                component={MainIcon}
                inheritViewBox
                sx={{
                  color: '#FFF',
                  fontSize: 28
                }}
              />
              <Typography
                variant='span'
                sx={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#FFF',
                  letterSpacing: '0.5px',
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                Taskify
              </Typography>
            </Box>
          </Link>
        </Tooltip>

        {/* Navigation buttons */}
        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 1.2,
          marginLeft: 1
        }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Button
            variant="contained"
            startIcon={<AddToPhotosIcon />}
            sx={{
              background: 'linear-gradient(45deg, #00C6FB 0%, #38EF7D 100%)',
              color: '#1D2125',
              fontWeight: 600,
              padding: '6px 16px',
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              transition: 'all 0.25s ease',
              '&:hover': {
                background: 'linear-gradient(45deg, #00C6FB 30%, #38EF7D 90%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              },
              '&:active': {
                transform: 'translateY(1px)'
              }
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <TextField
          id="outlined-search"
          placeholder="Search..."
          type="search"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 20, color: 'rgba(255,255,255,0.7)' }}/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {searchValue && (
                  <CloseIcon
                    sx={{
                      fontSize: 18,
                      color: 'rgba(255,255,255,0.7)',
                      cursor: 'pointer',
                      '&:hover': {
                        color: '#fff'
                      }
                    }}
                    onClick={() => setSearchValue('')}
                  />
                )}
              </InputAdornment>
            )
          }}
          sx={{
            minWidth: 160,
            maxWidth: 200,
            '& .MuiInputBase-root': {
              color: '#FFF',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)'
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)'
              }
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255,255,255,0.7)',
              opacity: 1
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none'
            }
          }}
        />

        <SelectMode />

        {/* Using the Notifications component instead of just the icon */}
        <Notifications />

        <Tooltip title="Help & Information" arrow>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}>
            <HelpOutlineIcon sx={{ color: '#FFF', fontSize: 22 }} />
          </Box>
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar