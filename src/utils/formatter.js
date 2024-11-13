export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const generatePlaceholder = (list) => {
  return {
    id: `${list.id}-placeholder-card`,
    boardId: list.boardId,
    listId: list.id,
    FE_Placeholder: true
  }
}