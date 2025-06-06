import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Cancel'
import RestoreIcon from '@mui/icons-material/Restore'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import { getClosedBoardsAPI, reopenBoardAPI, removeBoardAPI } from '~/apis'
import InventoryIcon from '@mui/icons-material/Inventory'
import { styled } from '@mui/material/styles'
import { useConfirm } from 'material-ui-confirm'
// Sidebar item UI
const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  }
}))

function SidebarViewClosedBoardsModal({ afterReopenBoard }) {
  const [isOpen, setIsOpen] = useState(false)
  const [boards, setBoards] = useState([])
  const confirmDelete = useConfirm()
  const handleOpenModal = () => {
    setIsOpen(true)
    fetchClosedBoards()
  }

  const handleCloseModal = () => setIsOpen(false)

  const fetchClosedBoards = () => {
    getClosedBoardsAPI()
      .then(res => {
        setBoards(res.data.boards) // nếu API trả về dạng { data: [...] }
      })
      .catch(() => {})
  }
  const handleReopenBoard = (boardId) => {
    reopenBoardAPI(boardId)
      .then(() => {
        toast.success('Board reopened successfully!')
        afterReopenBoard?.()
        fetchClosedBoards() // refresh
      })
      .catch(() => {})
  }

  const handleCloseBoard = (boardId) => {
    confirmDelete({
      title: 'Table Closed',
      description: 'All lists, cards, and actions will be deleted, and you won\'t be able to reopen the board. There is no undoing.',
      confirmationText: 'Yes, delete it',
      confirmationButtonProps: {
        variant: 'contained',
        color: 'error'
      },
      cancellationText: 'Cancel',
      cancellationButtonProps: {
        variant: 'contained',
        color: 'primary'
      }
    }).then(() => {
      removeBoardAPI(boardId)
    }).then(() => {
      toast.success('Board closed successfully!')
      afterReopenBoard?.()
      fetchClosedBoards() // refresh
    })
      .catch(() => {})
  }

  return (
    <>
      <SidebarItem onClick={handleOpenModal} >
        <CloseFullscreenIcon fontSize="small" color="action" />
        View closed boards
      </SidebarItem>

      <Modal open={isOpen} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'white',
          boxShadow: 24,
          borderRadius: '8px',
          border: 'none',
          padding: '20px 30px',
          outline: 0,
          p: 3,
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : 'white'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InventoryIcon fontSize="small" color="action" />
              <Typography variant="h6">Closed Boards</Typography>
            </Box>
            <CancelIcon onClick={handleCloseModal} sx={{ cursor: 'pointer' }} color="error" />
          </Box>

          <Box sx={{ mt: 2 }}>
            {boards.length === 0 ? (
              <Typography>No closed boards found.</Typography>
            ) : (
              boards.map(board => (
                <Box key={board.id} sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 1,
                  mb: 1,
                  border: '1px solid #ccc',
                  borderRadius: 1
                }}>

                  <Box>
                    <Typography fontWeight="bold">{board.title}</Typography>
                    <Typography variant="body2">{board.description}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<RestoreIcon />}
                      onClick={() => handleReopenBoard(board.id)}
                    >
                        Reopen
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteForeverIcon />}
                      onClick={() => handleCloseBoard(board.id)}
                    >
                        Delete
                    </Button>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default SidebarViewClosedBoardsModal
