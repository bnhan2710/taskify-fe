import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import Tooltip from '@mui/material/Tooltip'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const LIST_HEADER_HEIGHT = '50px'
const LIST_FOOTER_HEIGHT = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }


  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#0093E9' : '#1976d2'),
        background:(themes) => themes.palette.mode === 'dark' ? 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)' : 'linear-gradient(90deg, rgba(14,0,252,1) 0%, rgba(52,52,198,1) 0%, rgba(50,57,200,1) 34%, rgba(0,212,255,1) 100%)',
        width: '100%',
        height: (theme) => theme.taskify.boardContentHeight,
        p:'10px 0',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}
    >
      {/* Box list */}
      <Box
        sx={{
          bgcolor:'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '*::-webkit-scrollbar-track': { m:2 }
        }}>
        {/* box01 */}
        <Box
          sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101204' : '#F4F5F7'),
            ml: 2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: (theme) => `calc(1${theme.taskify.boardContentHeight} - ${theme.spacing(5)})`
          }}
        >
          {/* Box list header */}
          <Box
            sx={{
              height: LIST_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h6" sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: (theme) => (theme.palette.mode === 'dark' ? '#B6C2CF' : '#B6C2CF')
            }}>

            List Title</Typography>
            <Box>
              <Tooltip title= "More options">
                <MoreHorizIcon
                  sx={{
                    color: '#9EACBA',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: '#282F27',
                      borderRadius: '4px',
                      alignItems: 'center'
                    }
                  }}
                  id="basic-LIST-dropdown"
                  aria-controls={open ? 'basic-menu-LIST-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                sx ={{
                }}
                id="basic-menu-workspaces"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-LIST-dropdown"'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>

                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>


                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>

                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><DeleteOutlineIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this list</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this list</ListItemText>
                </MenuItem>
              </Menu>
            </Box>

          </Box>

          {/* List card */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX:'hidden',
            overflowY:'auto',
            maxHeight:(theme) => `calc(${theme.taskify.boardContentHeight} - ${theme.spacing(5)} - ${LIST_HEADER_HEIGHT} - ${LIST_FOOTER_HEIGHT})`,
            '*::-webkit-scrollbar-thumb': { backgroundColor: '#9EACBA', borderRadius: '8px' },
            '*::-webkit-scrollbar-thumb:hover': { backgroundColor: '#9EACBA' }
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
              p: 1,
              overflow: 'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://scontent.fdad8-2.fna.fbcdn.net/v/t39.30808-6/465438784_1184341326826690_5782822301550868782_n.jpg?stp=dst-jpg_p180x540&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEp7MzlX7PO5qh0EbtZyQH7uha24s1nMoq6FrbizWcyimoi_uNUXi7Y2G1F_UcblhpEIUb3UldxnqmBGLUf_yba&_nc_ohc=vpYv7jBW0dkQ7kNvgE8RC8R&_nc_zt=23&_nc_ht=scontent.fdad8-2.fna&_nc_gid=Acd6tptA2tlwt_SN_M3QlAM&oh=00_AYCmRk_yDkgoAJqudjrQR0Kgxz4V1zExWGbsz_32TBVArQ&oe=672F8C96"
                title="green iguana"
              />
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }} >
                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>20</Button>
                <Button size="small" startIcon={<CheckCircleOutlineIcon/>}>10</Button>
              </CardActions>
            </Card>

            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              height: LIST_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button
              startIcon={<AddCardIcon />}
              width="100%"
            >Add a card </Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor:'pointer' }}/>
            </Tooltip>
          </Box>
        </Box>
        {/* box02 */}
        <Box
          sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101204' : '#F4F5F7'),
            ml: 2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: (theme) => `calc(1${theme.taskify.boardContentHeight} - ${theme.spacing(5)})`
          }}
        >
          {/* Box list header */}
          <Box
            sx={{
              height: LIST_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h6" sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: (theme) => (theme.palette.mode === 'dark' ? '#B6C2CF' : '#B6C2CF')
            }}>

            List Title</Typography>
            <Box>
              <Tooltip title= "More options">
                <MoreHorizIcon
                  sx={{
                    color: '#9EACBA',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: '#282F27',
                      borderRadius: '4px',
                      alignItems: 'center'
                    }
                  }}
                  id="basic-LIST-dropdown"
                  aria-controls={open ? 'basic-menu-LIST-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                sx ={{
                }}
                id="basic-menu-workspaces"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-LIST-dropdown"'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>

                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>


                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>

                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><DeleteOutlineIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this list</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this list</ListItemText>
                </MenuItem>
              </Menu>
            </Box>

          </Box>

          {/* List card */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX:'hidden',
            overflowY:'auto',
            maxHeight:(theme) => `calc(${theme.taskify.boardContentHeight} - ${theme.spacing(5)} - ${LIST_HEADER_HEIGHT} - ${LIST_FOOTER_HEIGHT})`,
            '*::-webkit-scrollbar-thumb': { backgroundColor: '#9EACBA', borderRadius: '8px' },
            '*::-webkit-scrollbar-thumb:hover': { backgroundColor: '#9EACBA' }
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
              p: 1,
              overflow: 'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://scontent.fdad8-2.fna.fbcdn.net/v/t39.30808-6/465438784_1184341326826690_5782822301550868782_n.jpg?stp=dst-jpg_p180x540&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEp7MzlX7PO5qh0EbtZyQH7uha24s1nMoq6FrbizWcyimoi_uNUXi7Y2G1F_UcblhpEIUb3UldxnqmBGLUf_yba&_nc_ohc=vpYv7jBW0dkQ7kNvgE8RC8R&_nc_zt=23&_nc_ht=scontent.fdad8-2.fna&_nc_gid=Acd6tptA2tlwt_SN_M3QlAM&oh=00_AYCmRk_yDkgoAJqudjrQR0Kgxz4V1zExWGbsz_32TBVArQ&oe=672F8C96"
                title="green iguana"
              />
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }} >
                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>20</Button>
                <Button size="small" startIcon={<CheckCircleOutlineIcon/>}>10</Button>
              </CardActions>
            </Card>

            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              height: LIST_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button
              startIcon={<AddCardIcon />}
              width="100%"
            >Add a card </Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor:'pointer' }}/>
            </Tooltip>
          </Box>
        </Box>
      </Box>

    </Box>
  )
}

export default BoardContent
