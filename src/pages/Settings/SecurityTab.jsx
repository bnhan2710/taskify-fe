import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import PasswordIcon from '@mui/icons-material/Password'
import LockResetIcon from '@mui/icons-material/LockReset'
import LockIcon from '@mui/icons-material/Lock'
import LogoutIcon from '@mui/icons-material/Logout'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import Fade from '@mui/material/Fade'
import ShieldIcon from '@mui/icons-material/Shield'
import { alpha } from '@mui/material/styles'
import { FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useForm } from 'react-hook-form'
import { useConfirm } from 'material-ui-confirm'
import { channgePasswordAPI } from '~/apis'
import { toast } from 'react-toastify'


function PasswordStrengthIndicator({ password }) {
  if (!password) return null

  let strength = 0
  if (password.length >= 8) strength += 1
  if (/[A-Z]/.test(password)) strength += 1
  if (/[0-9]/.test(password)) strength += 1
  if (/[^A-Za-z0-9]/.test(password)) strength += 1

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['error.main', 'warning.main', 'info.main', 'success.main']

  return (
    <Fade in={!!password}>
      <Box sx={{ mt: 1, mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            Password Strength
          </Typography>
          <Typography variant="caption" color={strengthColors[strength - 1]}>
            {strengthLabels[strength - 1]}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={strength * 25}
          color={
            strength === 1 ? 'error' :
              strength === 2 ? 'warning' :
                strength === 3 ? 'info' : 'success'
          }
          sx={{ height: 4, borderRadius: 2 }}
        />
      </Box>
    </Fade>
  )
}

function SecurityTab() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const confirmChangePassword = useConfirm()
  const [newPassword, setNewPassword] = useState('')

  const submitChangePassword = (data) => {
    confirmChangePassword({
      title: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LogoutIcon sx={{ color: 'warning.dark' }} /> Change Password
      </Box>,
      description: 'Are you sure you want to change your password?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    }).then(() => {
      const { current_password, new_password } = data
      const changePasswordDto = {
        currentPassword: current_password,
        newPassword: new_password
      }
      channgePasswordAPI(changePasswordDto)
        .then((res) => {
          if (res.status === 200) {
            toast.success('Password changed successfully!')
          } else {
            toast.error(res.data.message)
          }
        }
        ).catch((err) => {
          toast.error(err.response?.data?.message || 'Failed to change password')
        }
        )
    }).catch(() => {})
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>
      <Paper
        elevation={0}
        sx={{
          width: { xs: '100%', sm: '500px' },
          p: 4,
          borderRadius: 3,
          background: theme => alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2
            }}
          >
            <ShieldIcon fontSize="large" />
          </Box>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Security Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your account password and security preferences
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={handleSubmit(submitChangePassword)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }}
                {...register('current_password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
                error={!!errors['current_password']}
              />
              <FieldErrorAlert errors={errors} fieldName={'current_password'} />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }}
                {...register('new_password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  },
                  onChange: (e) => setNewPassword(e.target.value)
                })}
                error={!!errors['new_password']}
              />
              <PasswordStrengthIndicator password={newPassword} />
              <FieldErrorAlert errors={errors} fieldName={'new_password'} />
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                Password must be at least 8 characters with uppercase, lowercase, number and special character
              </Typography>
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockResetIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }}
                {...register('new_password_confirmation', {
                  validate: (value) => {
                    if (value === watch('new_password')) return true
                    return 'Password confirmation does not match.'
                  }
                })}
                error={!!errors['new_password_confirmation']}
              />
              <FieldErrorAlert errors={errors} fieldName={'new_password_confirmation'} />
            </Box>

            <Box sx={{ mt: 1 }}>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)'
                  },
                  '&:active': {
                    transform: 'translateY(0)'
                  }
                }}
              >
                Update Password
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default SecurityTab