import {
  Box,
  CircularProgress,
  Container,
  Typography
} from '@mui/material'
import { useEffect } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI
} from '~/apis'
import { cloneDeep } from 'lodash'
import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function Board() {
  const dispatch = useDispatch()
  // không dùng state của component Board nữa
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)

  const { boardId } = useParams()

  useEffect(() => {
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  //gọi API sắp xếp lại vị trí các column
  const moveColumns = (dndOrderedColumns) => {
    //Update dữ liệu state board
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = {
      ...board
    }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    //cập nhật lại dữ liệu State Board
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))


    // Gọi API update board
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds
    })
  }

  //Khi di chuyển card trong cùng 1 column để thay đổi vị trí trong mảng cardOrderIds
  const moveCardInSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    //Update dữ liệu state board
    // Tương tự như createNewColumn, cần deep copy dữ liệu board để tránh lỗi
    const newBoard = cloneDeep(board)

    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    //Gọi API update Column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = {
      ...board
    }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    //cập nhật lại dữ liệu State Board
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    //Xử lý cho card cuối cùng của column cũ
    let prevCardOrderIds = dndOrderedColumns.find(column => column._id === prevColumnId)?.cardOrderIds

    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []


    //Gọi API update Column
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(column => column._id === nextColumnId)?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        height: '100vh',
        width: '100vw' }}>
        <CircularProgress/>
        <Typography >Loading Board ........</Typography>
      </Box>
    )
  }

  return (
    <>
      <Container disableGutters maxWidth= {false} sx={{ height: '100vh' }}>
        <AppBar />
        {/* Optional Chaining -  Code mockData*/}
        {/* <BoardBar board={mockData?.board} />
        <BoardContent board={mockData?.board}/> */}

        {/* Code gốc */}
        <BoardBar board={board} />
        <BoardContent
          board={board}

          moveColumns = {moveColumns}
          moveCardInSameColumn = {moveCardInSameColumn}
          moveCardToDifferentColumn = {moveCardToDifferentColumn}
        />
      </Container>
    </>
  )
}

export default Board
