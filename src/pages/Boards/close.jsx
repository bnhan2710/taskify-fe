import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Cancel'
import RestoreIcon from '@mui/icons-material/Restore'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { getClosedBoardsAPI, reopenBoardAPI, removeBoardAPI } from '~/apis'
import InventoryIcon from '@mui/icons-material/Inventory'
import { styled } from '@mui/material/styles'
import { useConfirm } from 'material-ui-confirm'

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
  const [page, setPage] = useState(1)
  const [totalBoards, setTotalBoards] = useState(0)
  const ITEMS_PER_PAGE = 4
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
        setTotalBoards(res.data.boards.length)
      })
      .catch(() => {})
  }

  const getCurrentPageBoards = () => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return boards.slice(startIndex, endIndex)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleReopenBoard = (boardId) => {
    reopenBoardAPI(boardId)
      .then(() => {
        const updatedBoards = boards.filter(board => board.id !== boardId)
        setBoards(updatedBoards)
        setTotalBoards(prevTotal => prevTotal - 1)
        const totalPages = Math.ceil(updatedBoards.length / ITEMS_PER_PAGE)
        if (page > 1 && page > totalPages) {
          setPage(page - 1)
        }
        toast.success('Board reopened successfully!')
        afterReopenBoard?.()
      })
      .catch(() => {
        toast.error('Failed to reopen board')
      })
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
        .then(() => {
          const updatedBoards = boards.filter(board => board.id !== boardId)
          setBoards(updatedBoards)
          setTotalBoards(prevTotal => prevTotal - 1)
          const totalPages = Math.ceil(updatedBoards.length / ITEMS_PER_PAGE)
          if (page > 1 && page > totalPages) {
            setPage(page - 1)
          }
          toast.success('Board deleted successfully!')
        })
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
          top: '300px',
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
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : 'white',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}>
          <Box sx={{
            position: 'sticky',
            top: 0,
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : 'white',
            zIndex: 1,
            py: 2,
            borderBottom: '1px solid #ddd'
          }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InventoryIcon fontSize="small" color="action" />
                <Typography variant="h6">
                    Closed Boards
                </Typography>
              </Box>
              <CancelIcon onClick={handleCloseModal} sx={{ cursor: 'pointer' }} color="error" />
            </Box>
          </Box>

          <Box sx={{
            flex: 1,
            py: 2
          }}>
            {boards.length === 0 ? (
              <Typography>No closed boards found.</Typography>
            ) : (
              getCurrentPageBoards().map(board => (
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

          {totalBoards > ITEMS_PER_PAGE && (
            <Box sx={{
              position: 'sticky',
              bottom: 0,
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : 'white',
              pt: 2,
              borderTop: '1px solid #ddd'
            }}>
              <Stack spacing={2} alignItems="center">
                <Pagination
                  count={Math.ceil(totalBoards / ITEMS_PER_PAGE)}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                />
              </Stack>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default SidebarViewClosedBoardsModal
