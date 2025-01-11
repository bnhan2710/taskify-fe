import { styled } from '@mui/material/styles'

const HiddenInputStyles = styled('input')({
  display: 'none',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  // bottom: 0, // Nếu dùng bottom: 0 như docs thì sẽ phát sinh lỗi ở Modal ActiveCard mỗi lần click là scroll bị nhảy xuống bottom
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

function VisuallyHiddenInput(props) {
  return <HiddenInputStyles {...props} />
}

export default VisuallyHiddenInput
