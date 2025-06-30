import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

/*Board*/
//Đã move vào redux
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//   return res.data
// }

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const res = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return res.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const res = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return res.data
}

/*Column*/
export const createNewColumnAPI = async (newColumnData) => {
  const res = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return res.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const res = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return res.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const res = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return res.data
}

/*Card*/
export const createNewCardAPI = async (newCardData) => {
  const res = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return res.data
}