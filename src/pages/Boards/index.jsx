import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
// Grid: https://mui.com/material-ui/react-grid2/#whats-changed
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import HomeIcon from '@mui/icons-material/Home'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Unstable_Grid2'
import randomColor from 'randomcolor'
import { Link, useLocation } from 'react-router-dom'
import { getMyBoardsAPI, getPublicBoardsAPI } from '~/apis'
import BoardToggle from '~/components/SelectMode/BoardToggle'
import SidebarViewClosedBoardsModal from './close'
import SidebarCreateBoardModal from './create'

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f5f5f5',
    transform: 'translateY(-2px)',
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)'
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff',
    fontWeight: 'bold'
  }
}))

function Boards() {
  const [boards, setBoards] = useState(null)
  const [totalBoards, setTotalBoards] = useState(null)
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 9)
  const isPublic = query.get('public') === 'true'
  const ITEMS_PER_PAGE = 9

  const updateStateData = (res) => {
    setBoards(res.boards?.slice(0, ITEMS_PER_PAGE))
    setTotalBoards(res.totalBoards || 0)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    params.set('limit', ITEMS_PER_PAGE)
    params.set('offset', (page - 1) * ITEMS_PER_PAGE)
    if (isPublic) {
      getPublicBoardsAPI(`?${params.toString()}`).then(updateStateData)
    } else {
      getMyBoardsAPI(`?${params.toString()}`).then(updateStateData)
    }
  }, [location.search, isPublic, page])

  const afterCreateBoard = () => {
    const params = new URLSearchParams(location.search)
    params.set('limit', ITEMS_PER_PAGE)
    params.set('offset', (page - 1) * ITEMS_PER_PAGE)
    if (isPublic) {
      getPublicBoardsAPI(`?${params.toString()}`).then(updateStateData)
    } else {
      getMyBoardsAPI(`?${params.toString()}`).then(updateStateData)
    }
  }

  if (!boards) {
    return <PageLoadingSpinner caption="Loading Boards..." />
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh' }}>
      <AppBar />
      <Box sx={{ paddingX: { xs: 2, md: 4 }, paddingY: 4 }}>
        <Grid container spacing={3}>
          <Grid xs={10} sm={3} sx={{ mb: { xs: 3, sm: 0 } }}>
            <Stack
              direction="column"
              spacing={1.5}
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, pl: 1 }}>
                Navigation
              </Typography>
              <SidebarItem className="active">
                <SpaceDashboardIcon fontSize="small" />
                Boards
              </SidebarItem>
              <SidebarItem component={Link} to="/boards/templates" sx={{ textDecoration: 'none', color: 'inherit' }}>
                <ListAltIcon fontSize="small" />
                Templates
              </SidebarItem>
              <SidebarItem>
                <HomeIcon fontSize="small" />
                Home
              </SidebarItem>
              <Divider sx={{ my: 1 }} />
              <SidebarCreateBoardModal afterCreateBoard={afterCreateBoard} />
              <SidebarViewClosedBoardsModal board={boards} afterReopenBoard={afterCreateBoard} />
            </Stack>
          </Grid>
          <Grid xs={10} sm={9}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                mb: 3
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  textAlign: { xs: 'center', sm: 'left' },
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '40px',
                    height: '3px',
                    bottom: '-8px',
                    left: { xs: 'calc(50% - 20px)', sm: '0' },
                    backgroundColor: '#0c66e4'
                  }
                }}
              >
                {isPublic ? 'Public Boards' : 'Your Boards'}
              </Typography>

              <BoardToggle />
            </Box>
            {boards?.length === 0 &&
              <Box
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: 2,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#666' }}>
                  {isPublic
                    ? 'No public boards available.'
                    : 'You don\'t have any boards yet. Create one to get started!'}
                </Typography>
              </Box>
            }
            {boards?.length > 0 &&
            <>
              <Grid container spacing={3}>
                {boards.map(b =>
                  <Grid item xs={12} sm={6} md={4} key={b.id || b}>
                    <Card
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        borderRadius: 2,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 20px rgba(0,0,0,0.12)'
                        }
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          height: '140px',
                          backgroundColor: randomColor(),
                          backgroundImage: `url(${b.cover})`
                        }}
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {b.title || `Board ${b}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            height: '40px'
                          }}
                        >
                          {b.description || 'No description available.'}
                        </Typography>
                        <Box
                          component={Link}
                          to={`/boards/${b.id || b}`}
                          sx={{
                            mt: 2,
                            py: 1,
                            px: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'primary.main',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'primary.main',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: 'rgba(12, 102, 228, 0.05)',
                              transform: 'translateX(4px)'
                            }
                          }}
                        >
                          Go to board <ArrowRightIcon fontSize="small" sx={{ ml: 0.5 }} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </>
            }
            {(totalBoards > 0) &&
              <Box sx={{
                mt: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& .MuiPaginationItem-root': {
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }
              }}>
                <Pagination
                  size="large"
                  color="secondary"
                  showFirstButton
                  showLastButton
                  count={Math.ceil(totalBoards / 6)}
                  page={page}
                  renderItem={(item) => {
                    // Preserve the public parameter when paginating
                    const query = new URLSearchParams()
                    if (isPublic) {
                      query.set('public', 'true')
                    }
                    if (item.page !== 1) {
                      query.set('page', item.page)
                    }
                    const queryString = query.toString()
                    return (
                      <PaginationItem
                        component={Link}
                        to={`/boards${queryString ? `?${queryString}` : ''}`}
                        {...item}
                      />
                    )
                  }}
                />
              </Box>
            }
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Boards
