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

export const interceptorLoadingElements = (calling) => {

  const elements = document.querySelectorAll('.interceptor-loading')
  for (let i = 0; i < elements.length; i++) {
    if (calling) {

      elements[i].style.opacity = '0.5'
      elements[i].style.pointerEvents = 'none'
    } else {

      elements[i].style.opacity = 'initial'
      elements[i].style.pointerEvents = 'initial'
    }
  }
}