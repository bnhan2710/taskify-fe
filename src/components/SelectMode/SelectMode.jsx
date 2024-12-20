import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import Box from '@mui/material/Box'

function SelectMode() {
  const { mode, setMode } = useColorScheme()
  const handleChange = ( event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel
        id="label-select-dark-light-mode"
        sx={{ color: '#9EACBA' }}
      >
      Mode
      </InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: '#9EACBA',
          '& .MuiSelect-icon': { color: '#9EACBA' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#9EACBA' },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9EACBA'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9EACBA'
          }
        }}
      >
        <MenuItem value="light">
          <Box sx={{ display : 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon fontSize='small' /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display : 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize='small' /> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display : 'flex', alignItems: 'center', gap: 1 }} >
            <SettingsBrightnessIcon fontSize='small' /> System
          </Box>
        </MenuItem>

      </Select>
    </FormControl>
  )
}

export default SelectMode
