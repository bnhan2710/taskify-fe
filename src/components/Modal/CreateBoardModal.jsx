import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import CancelIcon from '@mui/icons-material/Cancel'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import AbcIcon from '@mui/icons-material/Abc'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { createBoardAPI } from '~/apis'
import { toast } from 'react-toastify'

const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}

function CreateBoardModal({ open, onClose, afterCreateBoard }) {
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm()

  const handleCloseModal = () => {
    onClose()
    reset()
  }

  const submitCreateNewBoard = (data) => {
    const { title, description, type } = data
    const workspaceId = 'a693e862-6dd3-4f7c-b32a-f72d22a94840'
    const createBoardDto = { title, description, type, workspaceId }

    createBoardAPI(createBoardDto)
      .then(res => {
        if (res.error) {
          toast.error(res.error)
          return
        }
        toast.success('Create new board successfully!')
        handleCloseModal()
        if (afterCreateBoard) {
          afterCreateBoard()
        }
      })
      .catch(error => {
        toast.error(error)
      })
  }

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'white',
        boxShadow: 24,
        borderRadius: '8px',
        border: 'none',
        outline: 0,
        padding: '20px 30px',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : 'white'
      }}>
        <Box sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer'
        }}>
          <CancelIcon
            color="error"
            sx={{ '&:hover': { color: 'error.light' } }}
            onClick={handleCloseModal} />
        </Box>
        <Box id="modal-modal-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LibraryAddIcon />
          <Typography variant="h6" component="h2"> Create a new board</Typography>
        </Box>
        <Box id="modal-modal-description" sx={{ my: 2 }}>
          <form onSubmit={handleSubmit(submitCreateNewBoard)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <TextField
                  autoFocus
                  fullWidth
                  label="Title"
                  type="text"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AbcIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  {...register('title', {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: { value: 3, message: 'Min Length is 3 characters' },
                    maxLength: { value: 50, message: 'Max Length is 50 characters' }
                  })}
                  error={!!errors['title']}
                />
                <FieldErrorAlert errors={errors} fieldName={'title'} />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Description"
                  type="text"
                  variant="outlined"
                  multiline
                  rows={3}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  {...register('description', {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: { value: 3, message: 'Min Length is 3 characters' },
                    maxLength: { value: 255, message: 'Max Length is 255 characters' }
                  })}
                  error={!!errors['description']}
                />
                <FieldErrorAlert errors={errors} fieldName={'description'} />
              </Box>

              <Controller
                name="type"
                defaultValue={BOARD_TYPES.PUBLIC}
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    onChange={(event, value) => field.onChange(value)}
                    value={field.value}
                    sx={{ gap: 2 }}
                  >
                    <FormControlLabel
                      value={BOARD_TYPES.PUBLIC}
                      control={<Radio size="small" />}
                      label="Public"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value={BOARD_TYPES.PRIVATE}
                      control={<Radio size="small" />}
                      label="Private"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                )}
              />

              <Box sx={{ alignSelf: 'flex-end', display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  className="interceptor-loading"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Create
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateBoardModal
