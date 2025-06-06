import { useState } from 'react'
import Box from '@mui/material/Box'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { styled } from '@mui/material/styles'
import CreateBoardModal from '~/components/Modal/CreateBoardModal'

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
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}))

function SidebarCreateBoardModal({ afterCreateBoard }) {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)

  return (
    <>
      <SidebarItem onClick={handleOpenModal}>
        <LibraryAddIcon fontSize="small" />
        Create a new board
      </SidebarItem>

      <CreateBoardModal
        open={isOpen}
        onClose={handleCloseModal}
        afterCreateBoard={afterCreateBoard}
      />
    </>
  )
}

export default SidebarCreateBoardModal
