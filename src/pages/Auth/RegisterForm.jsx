import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import { registerAPI } from '~/apis'
import {
  EMAIL_RULE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE_MESSAGE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { toast } from 'react-toastify'

function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const navigate = useNavigate()
  const submitRegister = (data) => {
    const { email, password } = data
    const usernameFormEmail = data.email.split('@')[0]
    const registerDto = {
      email,
      password,
      username: usernameFormEmail
    }
    toast.promise(registerAPI(registerDto),
      {
        pending: 'Registation in progress...'
      }).then(() => {
      toast.success('Registration successful! Now you can log in.')
      navigate('/login')
    }).catch((error) => {
      toast.error(error.response.data.message)
    }
    )
  }

  return (
    <form onSubmit={handleSubmit(submitRegister)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{
          minWidth: 550,
          maxWidth: 580,
          marginTop: '3em',
          minHeight : 640,
          maxHeight : 640,
          position : 'absolute',
          right : '50px'
        }}>
          <Box sx={{
            margin: '1em',
            display: 'flex',
            justifyContent: 'start',
            gap: 1
          }}>
          </Box>
          <Box sx={{ marginTop: '1em', marginLeft: '2em', display: 'flex', justifyContent: 'start' }}>
            <Typography variant='h5'> Welcome to </Typography>
          </Box>
          <Box sx={{ marginLeft: '2em', display: 'flex', justifyContent: 'start', color: '#6d73ff' }}>
            <Typography variant='h4' sx ={{ fontWeight: 'bold' }}> Verified </Typography>
          </Box>
          <Box sx={{ padding: '0 2em 1em 2em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                label="Enter Email..."
                type="text"
                variant="outlined"
                error={!!errors['email']}
                {...register('email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE } })}
              />
              <FieldErrorAlert errors={errors} fieldName={'email'} />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Enter Password..."
                type="password"
                variant="outlined"
                error={!!errors['password']}
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE } })}
              />
              <FieldErrorAlert errors={errors} fieldName={'password'} />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Enter Password Confirmation..."
                type="password"
                variant="outlined"
                error={!!errors['password']}
                {...register('password_confirmation', {
                  validate: (value) => {
                    if (value === watch('password')) {
                      return true
                    } else {
                      return 'Password Confirmation does not match!'
                    }
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'password_confirmation'} />
            </Box>
          </Box>
          <Box sx={{ marginLeft: '2em', display: 'none', justifyContent: 'center' }}>
            <Typography variant='h7'>  </Typography>
          </Box>
          <CardActions sx={{ padding: '0 2em 1em 2em' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                backgroundColor : '#6d73ff'
              }}
            >
              Register
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>Already have an account?</Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' }, color : '#6d73ff' }}>Log in!</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default RegisterForm
