export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const generatePlaceholderCard = (column) => {
  return {
    FE_PlaceholderCard: true,
    _id: `${column._id}-placeholder-card`,
    columnId: column._id,
    boardId: column.boardId
  }
}