import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'

function Board() {
  const [board, setBoard] = useState()

  useEffect(() => {
    //sử dụng react-router-dom
    const boardId = '6751cedbfb4ee19a1fff35e8'

    //call API
    fetchBoardDetailsAPI(boardId).then(board => {
      //Cần xử lý khi column rỗng
      board.columns.forEach(column => {
        if(isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
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
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }
  //gọi API sắp xếp lại vị trí các column
  const moveColumns = async (dndOrderedColumns) => {
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
    await updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds
    })

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
        />
      </Container>
    </>
  )
}

export default Board
