import { createActivityLogAPI } from '~/apis'

export const ActivityTypes = {
  BOARD_UPDATED: 'board_updated',
  BOARD_DELETED: 'board_deleted',
  BOARD_CLOSED: 'board_closed',
  BOARD_REOPENED: 'board_reopened',
  BOARD_MEMBER_ADDED: 'board_member_added',
  BOARD_MEMBER_REMOVED: 'board_member_removed',
  LIST_CREATED: 'list_created',
  LIST_UPDATED: 'list_updated',
  LIST_DELETED: 'list_deleted',
  CARD_CREATED: 'card_created',
  CARD_UPDATED: 'card_updated',
  CARD_DELETED: 'card_deleted',
  CHECKLIST_CREATED: 'checklist_created',
  CHECKLIST_DELETED: 'checklist_deleted',
  CHECKLIST_ITEM_CHECKED: 'checklist_item_checked',
  CHECKLIST_ITEM_UNCHECKED: 'checklist_item_unchecked'
}

export const logActivity = async ({
  type,
  userId,
  boardId,
  listId,
  cardId,
  metadata
}) => {
  try {
    await createActivityLogAPI({
      type,
      userId,
      boardId,
      listId,
      cardId,
      metadata
    })
  } catch (error) {
    console.error('Failed to log activity:', error)
    // Don't throw error to avoid breaking main functionality
  }
}

// Helper functions for common activities
export const logBoardActivity = (type, userId, boardId, metadata = {}) => {
  return logActivity({ type, userId, boardId, metadata })
}

export const logListActivity = (type, userId, boardId, listId, metadata = {}) => {
  return logActivity({ type, userId, boardId, listId, metadata })
}

export const logCardActivity = (type, userId, boardId, listId, cardId, metadata = {}) => {
  return logActivity({ type, userId, boardId, listId, cardId, metadata })
}