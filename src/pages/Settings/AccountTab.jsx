import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MailIcon from '@mui/icons-material/Mail'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import CakeIcon from '@mui/icons-material/Cake'
import TransgenderIcon from '@mui/icons-material/Transgender'
import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { updateUserAPI, uploadAvatarAPI } from '~/redux/user/userSlice'
import { useDispatch } from 'react-redux'

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

function AccountTab() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const initialGeneralForm = {
    displayName: currentUser?.displayName || '',
    age: currentUser?.age || '',
    gender: currentUser?.gender || ''
  }
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: initialGeneralForm
  })

  const submitChangeGeneralInformation = (data) => {
    const { displayName, age, gender } = data

    const updateUserDto = {
      displayName,
      age,
      gender,
      userId: currentUser?.id
    }
    // Check if any field has changed
    const hasChanges =
      displayName !== currentUser?.displayName ||
      age !== currentUser?.age ||
      gender !== currentUser?.gender

    if (!hasChanges) return

    toast.promise(dispatch(updateUserAPI(updateUserDto)),
      {
        pending: 'Updating in progress...'
      }).then(res => {
      toast.success('Update successful')
    }).catch((error) => {
      console.log('error: ', error)
      toast.error('Update failed')
    })
  }


  const uploadAvatar = (e) => {
    //validate before handling
    const file = e.target?.files[0]
    if (!file) return
    
    const error = singleFileValidator(file)
    if (error) {
      toast.error(error)
      return
    }
    
    let formData = new FormData()
    formData.append('file', file)
    
    toast.promise(
      dispatch(uploadAvatarAPI(formData)),
      {
        pending: 'Uploading avatar...',
        success: 'Avatar uploaded successfully',
        error: 'Failed to upload avatar'
      }
    )
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Box sx={{
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <Avatar
              sx={{ width: 84, height: 84, mb: 1 }}
              alt="baonhan"
              src={currentUser?.avatar}
            />
            <Tooltip title="Upload a new image to update your avatar immediately.">
              <Button
                component="label"
                variant="contained"
                size="small"
                startIcon={<CloudUploadIcon />}>
                Upload
                <VisuallyHiddenInput type="file" onChange={uploadAvatar} />
              </Button>
            </Tooltip>
          </Box>
          <Box>
            <Typography variant="h6">{currentUser?.displayName}</Typography>
            <Typography sx={{ color: 'grey' }}>@{currentUser?.username}</Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
          <Box sx={{ width: '400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.email}
                fullWidth
                label="Your Email"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.username}
                fullWidth
                label="Your Username"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Your Display Name"
                type="text"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIndIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
                {...register('displayName', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
                error={!!errors['displayName']}
              />
              <FieldErrorAlert errors={errors} fieldName={'displayName'} />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Your Age"
                type="number"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CakeIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  inputProps: {
                    min: 0,
                    max: 120
                  }
                }}
                {...register('age', {
                  required: FIELD_REQUIRED_MESSAGE,
                  min: {
                    value: 0,
                    message: 'Age must be a positive number'
                  },
                  max: {
                    value: 120,
                    message: 'Age must be less than or equal to 120'
                  }
                })}
                error={!!errors['age']}
              />
              <FieldErrorAlert errors={errors} fieldName={'age'} />
            </Box>

            <Box>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Gender</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Gender"
                      startAdornment={
                        <InputAdornment position="start">
                          <TransgenderIcon fontSize="small" />
                        </InputAdornment>
                      }
                      error={!!errors['gender']}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              {errors.gender && (
                <FieldErrorAlert
                  errors={errors}
                  fieldName={'gender'}
                />
              )}
            </Box>

            <Box>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth>
                Update
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default AccountTab