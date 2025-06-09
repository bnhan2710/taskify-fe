import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import { toast } from 'react-toastify'
import { uploadBoardBackgroundAPI } from '~/apis'
import { useDispatch, useSelector } from 'react-redux'
import { updatecurrentActiveBoard, selectcurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { singleFileValidator } from '~/utils/validators'
import { fetchBoardDetailAPI } from '~/redux/activeBoard/activeBoardSlice'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

function ChangeBackgroundModal({ open, onClose, board }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentBoard = useSelector(selectcurrentActiveBoard)
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (event) => {
    const file = event.target?.files[0]
    if (!file) return

    const error = singleFileValidator(file)
    if (error) {
      toast.error(error)
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('boardCover', file)

      await uploadBoardBackgroundAPI(board.id, formData)
      dispatch(fetchBoardDetailAPI(board.id))
      navigate('/boards/' + board.id)
      toast.success('Background image uploaded successfully!')
      onClose()
    } catch (error) {
      console.error('Error uploading background image:', error)
      toast.error(error?.response?.data?.message || 'Failed to upload background image')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="change-background-modal"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 400 },
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 3
      }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h6" component="h2">
            Change Background
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Upload Image Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            Upload an image to set as board background
          </Typography>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            fullWidth
            disabled={uploading}
            sx={{ py: 2 }}
          >
            {uploading ? 'Uploading...' : 'Choose Image'}
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ChangeBackgroundModal