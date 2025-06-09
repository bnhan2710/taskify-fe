import React from 'react'
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Chip
} from '@mui/material'
import moment from 'moment'

const ActivityTypeLabels = {
  board_updated: 'updated board',
  board_deleted: 'deleted board',
  board_closed: 'closed board',
  board_reopened: 'reopened board',
  board_member_added: 'added member to board',
  board_member_removed: 'removed member from board',
  list_created: 'created list',
  list_updated: 'updated list',
  list_deleted: 'deleted list',
  card_created: 'created card',
  card_updated: 'updated card',
  card_deleted: 'deleted card',
  checklist_created: 'created checklist',
  checklist_deleted: 'deleted checklist',
  checklist_item_checked: 'checked item',
  checklist_item_unchecked: 'unchecked item'
}

const ActivityTypeColors = {
  board_updated: 'primary',
  board_deleted: 'error',
  board_closed: 'warning',
  board_reopened: 'success',
  board_member_added: 'info',
  board_member_removed: 'error',
  list_created: 'success',
  list_updated: 'primary',
  list_deleted: 'error',
  card_created: 'success',
  card_updated: 'primary',
  card_deleted: 'error',
  checklist_created: 'success',
  checklist_deleted: 'error',
  checklist_item_checked: 'success',
  checklist_item_unchecked: 'warning'
}

const ActivityLogItem = ({ activity }) => {
  const formatActivity = () => {
    const activityLabel = ActivityTypeLabels[activity.type] || activity.type
    let targetName = ''

    if (activity.card) {
      targetName = `"${activity.card.title}"`
    } else if (activity.list) {
      targetName = `"${activity.list.title}"`
    } else if (activity.board) {
      targetName = `"${activity.board.title}"`
    }

    return `${activityLabel} ${targetName}`
  }

  const getUserDisplayName = () => {
    if (!activity.user) return 'Unknown User'
    return activity.user.displayName || activity.user.username || 'Unknown User'
  }

  const formatMetadata = () => {
    if (!activity.metadata || Object.keys(activity.metadata).length === 0) {
      return null
    }

    // Format specific metadata nicely
    const metadata = activity.metadata
    let formattedText = ''

    if (metadata.cardTitle || metadata.listTitle || metadata.boardTitle) {
      const title = metadata.cardTitle || metadata.listTitle || metadata.boardTitle
      formattedText = `"${title}"`
    }

    if (metadata.action === 'wallpaper_removed') {
      formattedText += ' (removed wallpaper)'
    } else if (metadata.action === 'type_changed') {
      formattedText += ` (changed from ${metadata.oldType} to ${metadata.newType})`
    }

    if (metadata.checklistDescription) {
      formattedText = `"${metadata.checklistDescription}"`
      if (typeof metadata.isDone === 'boolean') {
        formattedText += metadata.isDone ? ' (marked as done)' : ' (marked as not done)'
      }
    }

    return formattedText || JSON.stringify(metadata, null, 2)
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 1,
        backgroundColor: '#393e46',
        borderLeft: '4px solid',
        borderLeftColor: `${ActivityTypeColors[activity.type] || 'primary'}.main`
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Avatar
          src={activity.user?.avatar}
          alt={getUserDisplayName()}
          sx={{ width: 32, height: 32 }}
        >
          {getUserDisplayName().charAt(0)?.toUpperCase()}
        </Avatar>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>
            <strong>{getUserDisplayName()}</strong> {formatActivity()}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={ActivityTypeLabels[activity.type] || activity.type}
              color={ActivityTypeColors[activity.type] || 'primary'}
              size="small"
              variant="outlined"
            />
            <Typography variant="caption" sx={{ color: '#bbb' }}>
              {moment(activity.createdAt).fromNow()}
            </Typography>
          </Box>
          {formatMetadata() && (
            <Box sx={{ mt: 1, p: 1, backgroundColor: '#2c2f35', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ color: '#aaa', fontStyle: 'italic' }}>
                {formatMetadata()}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  )
}

const ActivityLog = ({ activities, loading }) => {
  if (loading) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#bbb' }}>
          Loading activities...
        </Typography>
      </Box>
    )
  }

  if (!activities || activities.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#bbb' }}>
          No activities yet
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ maxHeight: '400px', overflowY: 'auto', p: 1 }}>
      {activities.map((activity) => (
        <ActivityLogItem key={activity.id} activity={activity} />
      ))}
    </Box>
  )
}

export default ActivityLog