import { useState } from 'react'
import Box from '@mui/material/Box'
import SelectMode from '~/components/SelectMode/SelectMode'
import { ReactComponent as MainIcon } from '~/assets/main-logo.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import AppsIcon from '@mui/icons-material/Apps'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineRounded'
import Profiles from './Menus/Profiles'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { Link, useNavigate } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import { searchBoardsAPI } from '~/apis'
import { useDebounceFn } from '~/customHooks/useDebounceFn'
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
  ClickAwayListener,
  CircularProgress,
  ListItemAvatar,
  Avatar,
  keyframes
} from '@mui/material'
import CreateBoardModal from '~/components/Modal/CreateBoardModal'
import Templates from './Menus/Templates'

// Pulse animation for loading skeleton
const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`

function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [createBoardModalOpen, setCreateBoardModalOpen] = useState(false)

  const navigate = useNavigate()

  // Debounced search function
  const debouncedSearch = useDebounceFn(async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      setSearchOpen(false)
      return
    }

    try {
      setSearching(true)
      const params = new URLSearchParams({
        q: query,
        limit: 10
      })
      const response = await searchBoardsAPI(`?${params.toString()}`)
      setSearchResults(response.boards || [])
      setSearchOpen(true)
    } catch (error) {
      // Silent error handling for search
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }, 500)

  const handleSearchInputChange = (e) => {
    const value = e.target.value
    setSearchValue(value)

    if (!value.trim()) {
      setSearchOpen(false)
      setSearchResults([])
      return
    }

    // Call debounced search function
    debouncedSearch(value)
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClearSearch()
    } else if (e.key === 'Enter' && searchResults.length > 0) {
      // Navigate to first result on Enter
      handleSelectBoard(searchResults[0].id)
    }
  }

  const handleClearSearch = () => {
    setSearchValue('')
    setSearchResults([])
    setSearchOpen(false)
  }

  const handleSearchFocus = (e) => {
    setAnchorEl(e.currentTarget)
    if (searchResults.length > 0 && searchValue.trim()) {
      setSearchOpen(true)
    }
  }

  const handleSelectBoard = (boardId) => {
    setSearchOpen(false)
    setSearchValue('')
    setSearchResults([])
    navigate(`/boards/${boardId}`)
  }

  const handleClickAway = () => {
    setSearchOpen(false)
  }

  const getRandomColor = () => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #ff8a80 0%, #ffab91 100%)'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.taskify.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
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
          <Templates />
          <Button
            variant="contained"
            startIcon={<AddToPhotosIcon />}
            onClick={() => setCreateBoardModalOpen(true)}
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
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ position: 'relative' }}>
            <TextField
              id="outlined-search"
              placeholder="Search boards..."
              type="search"
              size="small"
              value={searchValue}
              onChange={handleSearchInputChange}
              onFocus={handleSearchFocus}
              onKeyDown={handleSearchKeyDown}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {searching ? (
                      <CircularProgress size={16} sx={{ color: 'rgba(255,255,255,0.7)' }} />
                    ) : (
                      <SearchIcon sx={{ fontSize: 20, color: 'rgba(255,255,255,0.7)' }}/>
                    )}
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
                          transition: 'color 0.2s ease',
                          '&:hover': {
                            color: '#fff'
                          }
                        }}
                        onClick={handleClearSearch}
                      />
                    )}
                  </InputAdornment>
                )
              }}
              sx={{
                minWidth: { xs: 140, sm: 180, md: 220 },
                maxWidth: { xs: 160, sm: 200, md: 250 },
                '& .MuiInputBase-root': {
                  color: '#FFF',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.15)',
                  height: '40px',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }
                },
                '& .MuiInputBase-input': {
                  fontSize: '14px',
                  padding: '8px 0',
                  '&::placeholder': {
                    color: 'rgba(255,255,255,0.7)',
                    opacity: 1,
                    fontSize: '14px'
                  }
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                }
              }}
            />            {/* Search Results Dropdown */}
            <Popper
              open={searchOpen}
              anchorEl={anchorEl}
              placement="bottom-start"
              style={{
                zIndex: 1300,
                width: anchorEl?.offsetWidth > 200 ? anchorEl.offsetWidth : 300,
                maxWidth: 400
              }}
            >
              <Paper
                sx={{
                  mt: 1,
                  maxHeight: 400,
                  overflow: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  border: (theme) => theme.palette.mode === 'dark' ? '1px solid #555' : 'none',
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : 'white'
                }}
              >
                {searchResults.length === 0 && !searching && searchValue.trim() && (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No boards found for &quot;{searchValue}&quot;
                    </Typography>
                  </Box>
                )}

                {searching && (
                  <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CircularProgress size={16} />
                      <Typography variant="body2" color="text.secondary">
                        Searching...
                      </Typography>
                    </Box>
                    {/* Loading skeleton */}
                    {[1, 2, 3].map((item) => (
                      <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1,
                            backgroundColor: 'action.hover',
                            animation: `${pulse} 1.5s ease-in-out infinite`
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              height: 16,
                              backgroundColor: 'action.hover',
                              borderRadius: 1,
                              mb: 0.5,
                              animation: `${pulse} 1.5s ease-in-out infinite`
                            }}
                          />
                          <Box
                            sx={{
                              height: 12,
                              backgroundColor: 'action.hover',
                              borderRadius: 1,
                              width: '70%',
                              animation: `${pulse} 1.5s ease-in-out infinite`
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}

                {searchResults.length > 0 && !searching && (
                  <>
                    <Box sx={{
                      px: 2,
                      py: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e2329' : '#f8f9fa'
                    }}>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                        Search Results ({searchResults.length})
                      </Typography>
                    </Box>
                    <List sx={{ py: 1 }}>
                      {searchResults.map((board) => (
                        <ListItem
                          key={board.id}
                          button
                          onClick={() => handleSelectBoard(board.id)}
                          sx={{
                            px: 2,
                            py: 1.5,
                            '&:hover': {
                              backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#3c4043' : '#f0f0f0'
                            },
                            transition: 'background-color 0.2s ease'
                          }}
                        >
                          <ListItemAvatar sx={{ minWidth: 48 }}>
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 36,
                                height: 36,
                                background: board.cover?.startsWith('http')
                                  ? `url(${board.cover})`
                                  : getRandomColor(),
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                border: (theme) => `2px solid ${theme.palette.mode === 'dark' ? '#555' : '#e0e0e0'}`,
                                fontSize: '14px',
                                fontWeight: 'bold'
                              }}
                            >
                              {!board.cover && board.title?.charAt(0).toUpperCase()}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 600,
                                  color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#333',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {board.title}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  display: 'block',
                                  mt: 0.5,
                                  fontSize: '12px'
                                }}
                              >
                                {board.description || 'No description'}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </Paper>
            </Popper>
          </Box>
        </ClickAwayListener>

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

      <CreateBoardModal
        open={createBoardModalOpen}
        onClose={() => setCreateBoardModalOpen(false)}
        afterCreateBoard={() => {
          // Optionally navigate to boards page or refresh data
          navigate('/boards')
        }}
      />
    </Box>
  )
}

export default AppBar