import { useState } from 'react'
import Box from '@mui/material/Box'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import { styled } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import PublicIcon from '@mui/icons-material/Public'
import { useNavigate, useLocation } from 'react-router-dom'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  padding: '4px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  width: '100%',
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: 8,
    fontWeight: 600,
    padding: '8px 12px',
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      }
    },
    '&:not(.Mui-selected)': {
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      }
    }
  }
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    marginRight: theme.spacing(1)
  }
}))

function BoardToggle() {
  const navigate = useNavigate()
  const location = useLocation()
  const isPublic = location.search.includes('public=true')
  const [view, setView] = useState(isPublic ? 'public' : 'personal')

  // Maintain any other existing query parameters
  const handleToggleChange = (event, newView) => {
    if (newView !== null) {
      setView(newView)

      const query = new URLSearchParams(location.search)
      if (newView === 'public') {
        query.set('public', 'true')
      } else {
        query.delete('public')
      }

      // Preserve page parameter if it exists
      const pageParam = query.get('page')

      // Reset to page 1 when changing views
      if (pageParam) {
        query.set('page', '1')
      }

      const queryString = query.toString()
      navigate(`/boards${queryString ? `?${queryString}` : ''}`)
    }
  }

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <StyledToggleButtonGroup
        value={view}
        exclusive
        onChange={handleToggleChange}
        aria-label="board view"
        fullWidth
      >
        <ToggleButton value="personal" aria-label="personal boards">
          <IconWrapper>
            <PersonIcon fontSize="small" />
            Your Boards
          </IconWrapper>
        </ToggleButton>
        <ToggleButton value="public" aria-label="public boards">
          <IconWrapper>
            <PublicIcon fontSize="small" />
            Public Boards
          </IconWrapper>
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  )
}

export default BoardToggle