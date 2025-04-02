import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Link as MuiLink } from '@mui/material'
import {
  EMAIL_RULE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE_MESSAGE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const submitLogIn = (data) => {
    const { email, password } = data
    const loginDto = {
      email,
      password
    }
    toast.promise(dispatch(loginUserAPI(loginDto)),
      {
        pending: 'Login in progress...'
      }).then((res) => {
        console.log('res: ', res)
      if (!res.error) {
        toast.success('Login successful!')
        navigate('/')
      }
      else {
        toast.error(res.payload)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(submitLogIn)}>
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
            <Typography variant='h4' sx ={{ fontWeight: 'bold' }}> Taskify </Typography>
          </Box>
          <CardActions sx={{ padding: '20px 2em 1em 2em' }}>
            <Button
              onClick = {() => { console.log('Google login') }}
              // type="submit"
              variant="contained"
              // color="primary"
              size="large"
              fullWidth
              startIcon={<GoogleIcon sx={{ color: '#e74c3c' }}/>}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': { backgroundColor : '#f26464', color : 'white', '& .MuiSvgIcon-root': { color: 'white' } }
              }}
            >
              Login with Google
            </Button>
          </CardActions>
          <CardActions sx={{ padding: '0 2em 1em 2em' }}>
            <Button
              // type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              startIcon={<FacebookIcon sx={{ color: '#6d73ff' }}/>}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': { backgroundColor : '#585ee3', color : 'white', '& .MuiSvgIcon-root': { color: 'white' } }
              }}
            >
              Login with Facebook
            </Button>
          </CardActions>
          <Divider sx={{ padding: '5px 2em 5px 2em' }}>
            <Chip label="OR" size="small" />
          </Divider>
          <Box sx={{ padding: '0 2em 5px 2em' }}>
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
          </Box>
          <Box sx={{ padding: '0 2em 5px 2em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
            />
            <MuiLink href="#" underline="none" sx={{ '&:hover': { color: '#ffbb39' }, color : '#6d73ff' }}>
              {'Forgot Password?'}
            </MuiLink>
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
              Login
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>New to using Taskify?</Typography>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' }, color : '#6d73ff' }}>Create account!</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm
