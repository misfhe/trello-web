import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from '~/utils/constants'
import { mapOrder } from '~/utils/sort'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

// khởi tạo giá trị State ban đầu cho slice
const initialState = {
  currentActiveBoard: null
}

// Các hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk

export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return res.data
  }
)

// khởi tạo một slice trong kho lưu trữ Redux store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    // RULE: luôn cần cặp ngoặc nhọn {} cho function trong reducer cho dù code bên trong chỉ có một dòng
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer
      const fullBoard = action.payload

      // Xử lý dữ liệu nếu cần thiết


      // Update lại dữ liệu của currentActiveBoard
      state.currentActiveBoard = fullBoard
    }
  },

  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
        // action.payload là dữ liệu trả về từ API
        let board = action.payload

        // Xử lý dữ liệu nếu cần thiết
        board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

        board.columns.forEach(column => {
          //Cần xử lý khi column rỗng
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          } else {
            //Nếu có card thì sắp xếp lại vị trí của các card trong column
            column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
          }
        })

        // Update lại dữ liệu của currentActiveBoard
        state.currentActiveBoard = board
      })
  }
})

// Actions: là nơi quy dành cho các components bên dưới gọi bằng dispatch() tới nó để đề cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Notice: Không thấy properties actions vì những actions đơn giản là được Redux tạo tự động theo tên của reducer
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selectors: là nơi quy dành cho các components bên dưới gọi bằng hook userSelector() để lấy dữ liệu từ kho lưu trữ Redux store ra sử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

// cái file này tên là activeBoardSlice NHƯNG chúng ta export ra Reducer của nó
// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer