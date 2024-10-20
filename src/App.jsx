import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

function SelectMode() {
  const { mode, setMode } = useColorScheme()
  const handleChange = ( event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
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

function App() {
  return (
    <Container disableGutters maxWidth = {false} sx = {{ height: '100vh', backgroundColor: 'primary.main' }}>
      <Box sx ={{
        backgroundColor: 'primary.light',
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center'
      }} >
        <SelectMode/>
      </Box>
      <Box sx = {{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
          Boad Bar
      </Box>
      <Box sx = {{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight}) - ${theme.trello.boardBarHeight}`,
        display: 'flex',
        alignItems: 'center'
      }}>
          Board Content
      </Box>
    </Container>
  )
}

export default App