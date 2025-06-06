import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

function Templates() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/boards/templates')
  }

  return (
    <Box>
      <Button
        sx={{ color: '#9EACBA' }}
        onClick={handleClick}
      >
        Templates
      </Button>
    </Box>
  )
}

export default Templates