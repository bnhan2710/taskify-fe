import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material/'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CommentIcon from '@mui/icons-material/Comment'
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import { fetchCardDetailAPI } from '~/redux/activeCard/activeCardSlice'
import { selectCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import { useEffect, useState } from 'react'

function Card({ card }) {
  const dispatch = useDispatch()
  const activeCard = useSelector(selectCurrentActiveCard)
  const [cardState, setCardState] = useState(card)
  useEffect(() => {
    if (activeCard && activeCard.id === card.id) {
      setCardState({
        ...card,
        cover: activeCard.cover || card.cover,
        members: activeCard.members || card.members,
        comments: activeCard.comments || card.comments,
        attachments: activeCard.attachments || card.attachments,
        checklist: activeCard.checklist || card.checklist
      })
    } else {
      setCardState(card)
    }
  }, [activeCard, card])

  const { attributes, listeners, setNodeRef, transform, transition, isDragging
  } = useSortable({ id: card.id, data: { ...card } })
  const dndkitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #ccc' : undefined
  }

  const shouldShowCardActtions = () => {
    return !!cardState.comments?.length || !!cardState.attachments?.length || !!cardState.checklist?.length
  }

  const setActiveCard = () => {
    //update current active card
    dispatch(fetchCardDetailAPI(card.id))
  }

  return (
    <MuiCard
      onClick={setActiveCard}
      ref={setNodeRef} style = {dndkitCardStyles} {...attributes} {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0px 1px 1px rgba(0,0,0,0.2)',
        borderRadius: '12px',
        overflow: 'unset',
        opacity: cardState.FE_Placeholder ? '0' : '1',
        minWidth: cardState.FE_Placeholder ? '280px' : 'unset',
        pointerEvents: cardState.FE_Placeholder ? 'none' : 'unset',
        position: cardState.FE_Placeholder ? 'fixed' : 'unset',
        border: '1px solid transparent',
        '&:hover':  { borderColor: (theme) => theme.palette.primary.main }
      }}>
      {cardState?.cover && <CardMedia sx={{ height: 140 }} image={cardState.cover}/>}

      <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
        <Typography>{cardState?.title}</Typography>
      </CardContent>
      {shouldShowCardActtions() && <CardActions sx={{ p: '0 4px 8px 4px' }} >
        {!!cardState.comments?.length
          && <Button sx ={{ mr: 0.5 }} variant="text" color="inherit" size="small" startIcon={<CommentIcon/>}>{cardState.comments.length}</Button>}
        {!!cardState.members?.length
          && <Button sx ={{ mr: 0.5 }} variant="text" color="inherit" size="small" startIcon={<PeopleIcon/>}>{cardState.members.length}</Button>}
        {!!cardState.checklist?.length
          && <Button sx ={{ mr: 0.5 }} variant="text" color="inherit" size="small" startIcon={<CheckCircleOutlineIcon/>}>{cardState.checklist.length}</Button>}
      </CardActions> }
    </MuiCard>
  )
}

export default Card