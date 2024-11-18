import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material/'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging
  } = useSortable({ id: card.id, data: { ...card } })
  const dndkitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #ccc' : undefined
  }

  const shouldShowCardActtions = () => {
    return !!card.comments?.length || !!card.attachments?.length || !!card.checklist?.length
  }

  return (
    <MuiCard ref={setNodeRef} style = {dndkitCardStyles} {...attributes} {...listeners}
      sx={{

        cursor: 'pointer',
        boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
        borderRadius: '12px',
        overflow: 'unset',
        opacity: card.FE_Placeholder ? '0' : '1',
        minWidth: card.FE_Placeholder ? '280px' : 'unset',
        pointerEvents: card.FE_Placeholder ? 'none' : 'unset',
        position: card.FE_Placeholder ? 'fixed' : 'unset',
        border: '1px solid transparent',
        '&:hover':  { borderColor: (theme) => theme.palette.primary.main }

      }}>
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card.cover}/>}

      <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardActtions() && <CardActions sx={{ p: '0 4px 8px 4px' }} >
        {/* if !card.length return null else return Button */}
        {!!card.comments?.length
          && <Button size="small" startIcon={<CommentIcon/>}>{card.comments.length}</Button>}
        {!!card.attachments?.length
          && <Button size="small" startIcon={<AttachmentIcon/>}>{card.attachments.length}</Button>}
        {!!card.checklist?.length
          && <Button size="small" startIcon={<CheckCircleOutlineIcon/>}>{card.checklist.length}</Button>}
      </CardActions> }

    </MuiCard>
  )
}

export default Card