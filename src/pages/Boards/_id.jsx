import { 
  Box,
  CircularProgress, 
  Container, 
  Typography 
} from '@mui/material'
import { useEffect, useState } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { mapOrder } from '~/utils/sort'
import { 
  fetchBoardDetailsAPI,
  createNewColumnAPI, 
  createNewCardAPI, 
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    //sử dụng react-router-dom
    const boardId = '6751cedbfb4ee19a1fff35e8'
    
    //call API
    fetchBoardDetailsAPI(boardId).then(board => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(column => {
        //Cần xử lý khi column rỗng
        if(isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          //Nếu có card thì sắp xếp lại vị trí của các card trong column
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  //gọi API tạo mới column và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    //khi tao column mới thì chưa có card nên cần tạo card placeholder
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    //cập nhật lại dữ liệu State Board
    const newBoard = {
      ...board
    }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  //gọi API tạo mới card và làm lại dữ liệu State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    //cập nhật lại dữ liệu State Board
    const  newBoard = {
      ...board
    }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if(columnToUpdate) {
      //Nếu column rỗng (chứa placeholer-card) 
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else{
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }

    }
    setBoard(newBoard)
  }
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
    setBoard(newBoard)


    // Gọi API update board
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds
    })
  }

  //Khi di chuyển card trong cùng 1 column để thay đổi vị trí trong mảng cardOrderIds
  const moveCardInSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    //Update dữ liệu state board
    const newBoard = {
      ...board
    }

    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if(columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

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
    setBoard(newBoard)

    //Xử lý cho card cuối cùng của column cũ
    let prevCardOrderIds = dndOrderedColumns.find(column => column._id === prevColumnId)?.cardOrderIds

    if(prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []


    //Gọi API update Column
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(column => column._id === nextColumnId)?.cardOrderIds
    })
  }

  if(!board) {  
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
          createNewColumn = {createNewColumn}
          createNewCard = {createNewCard}
          moveColumns = {moveColumns}
          moveCardInSameColumn = {moveCardInSameColumn}
          moveCardToDifferentColumn = {moveCardToDifferentColumn}
        />
      </Container>
    </>
  )
}

export default Board
