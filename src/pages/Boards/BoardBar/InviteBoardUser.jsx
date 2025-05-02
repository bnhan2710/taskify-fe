import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, FIELD_REQUIRED_MESSAGE, EMAIL_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { inviteUserToBoardAPI, removeUserFromBoardAPI } from '~/apis'
import { toast } from 'react-toastify'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Divider from '@mui/material/Divider'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import IconButton from '@mui/material/IconButton'

function InviteBoardUser({ boardId, boardUsers = [] }) {
  const [openModal, setOpenModal] = useState(false)
  const [tabValue, setTabValue] = useState('email')
  const [role, setRole] = useState('Member')
  const [isInviting, setIsInviting] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [currentBoardUsers, setCurrentBoardUsers] = useState(boardUsers)

  useEffect(() => {
    setCurrentBoardUsers(boardUsers)
  }, [boardUsers])

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  const handleChangeTab = (event, newValue) => setTabValue(newValue)
  const handleRoleChange = (event) => setRole(event.target.value)
  const currentUser = useSelector(selectCurrentUser)

  const handleRemoveUser = async (userId) => {
    if (isRemoving) return

    try {
      setIsRemoving(true)

      await removeUserFromBoardAPI(boardId, userId)

      // Update local state to immediately reflect the change
      setCurrentBoardUsers(prevUsers => prevUsers.filter(user => user.id !== userId))

      toast.success('User removed from board successfully')
    } catch (error) {
      console.error('Error removing user from board:', error)
      toast.error(error?.response?.data?.message || 'Error removing user from board')
    } finally {
      setIsRemoving(false)
    }
  }

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const submitInviteUserToBoard = async (data) => {
    if (isInviting) return
    const { inviteeEmail } = data
    try {
      setIsInviting(true)
      await inviteUserToBoardAPI({ email: inviteeEmail, role }, boardId)
      setValue('inviteeEmail', '')
      toast.success(`Invitation sent to ${inviteeEmail}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error inviting user to board')
    } finally {
      setIsInviting(false)
    }
  }
  return (
    <Box>
      <Tooltip title="Share board">
        <Button
          onClick={handleOpenModal}
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' } }}
        >
          Share
        </Button>
      </Tooltip>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="share-board-modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 0,
          outline: 'none'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, pb: 2 }}>
            <Typography id="share-board-modal-title" variant="h6" component="h2">
              Share board
            </Typography>
            <Button onClick={handleCloseModal} sx={{ minWidth: 'unset', p: 1 }}>✕</Button>
          </Box>

          <Box sx={{ p: 3, pt: 0 }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChangeTab}>
                  <Tab label="Email" value="email" />
                  <Tab label="Board members" value="members" />
                  <Tab label="Join requests" value="requests" />
                </TabList>
              </Box>

              <TabPanel value="email" sx={{ p: 2, pt: 3 }}>
                <form onSubmit={handleSubmit(submitInviteUserToBoard)}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 3 }}>
                    <TextField
                      autoFocus
                      fullWidth
                      placeholder="Email address or name"
                      variant="outlined"
                      size="medium"
                      {...register('inviteeEmail', {
                        required: FIELD_REQUIRED_MESSAGE,
                        pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
                      })}
                      error={!!errors['inviteeEmail']}
                    />

                    <FormControl sx={{ minWidth: 120 }}>
                      <InputLabel id="permission-select-label">Role</InputLabel>
                      <Select
                        labelId="permission-select-label"
                        value={role}
                        label="Role"
                        onChange={handleRoleChange}
                      >
                        <MenuItem value="Member">Member</MenuItem>
                        <MenuItem value="Owner">Owner</MenuItem>
                        <MenuItem value="Guest">Guest</MenuItem>
                      </Select>
                    </FormControl>

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="interceptor-loading"
                    >
                      Invite
                    </Button>
                  </Box>

                  <FieldErrorAlert errors={errors} fieldName={'inviteeEmail'} />
                </form>

                <Divider sx={{ my: 3 }} />

              </TabPanel>

              <TabPanel value="members" sx={{ p: 2, pt: 3 }}>
                {currentBoardUsers && currentBoardUsers.length > 0 ? (
                  currentBoardUsers.map((user, index) => (
                    <Box key={user.id || index} sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1,
                      borderBottom: index < currentBoardUsers.length - 1 ? '1px solid rgba(0,0,0,0.12)' : 'none'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={user?.avatar} alt={user?.displayName || user?.username}>
                          {(user?.displayName || user?.username || 'U').charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1">
                            {user.displayName || user.username || 'Unknown User'}
                            {user.username === currentUser.username && <strong> <span style={{ color: 'green' }}> (You)</span> </strong>}
                          </Typography>
                          <Typography variant="caption" color="texzt.secondary">
                            {user.email || (user.username && '@' + user.username) || ''}
                          </Typography>
                        </Box>
                      </Box>

                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                          value={user.role}
                          disabled={ user.role === 'Owner'}
                        >
                          <MenuItem value="Owner">Owner</MenuItem>
                          <MenuItem value="Member">Member</MenuItem>
                          <MenuItem value="Guest">Guest</MenuItem>
                        </Select>
                      </FormControl>

                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveUser(user.id)}
                        disabled={isRemoving || user.role === 'Owner'}
                      >
                        <PersonRemoveIcon />
                      </IconButton>
                    </Box>
                  ))
                ) : (
                  <Typography>No board members yet</Typography>
                )}
              </TabPanel>

              <TabPanel value="requests" sx={{ p: 2, pt: 3 }}>
                <Typography>No join requests at this time</Typography>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default InviteBoardUser
