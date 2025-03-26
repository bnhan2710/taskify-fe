import { styled } from '@mui/material/styles'

const HiddenInputStyles = styled('input')({
  display: 'none',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

function VisuallyHiddenInput(props) {
  return <HiddenInputStyles {...props} />
}

export default VisuallyHiddenInput
