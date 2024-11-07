import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material/'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset'
      }}>
        <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
          <Typography>Card 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }

  return (

    <MuiCard sx={{
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
    </MuiCard>
  )
}

export default Card