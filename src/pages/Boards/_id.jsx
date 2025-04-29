import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState()

  useEffect(() => {
    //sử dụng react-router-dom
    const boardId = '6751cedbfb4ee19a1fff35e8'

    //call API
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  return (
    <>
      <Container disableGutters maxWidth= {false} sx={{ height: '100vh' }}>
        <AppBar />
        {/* Optional Chaining -  Code mockData*/}
        <BoardBar board={mockData?.board} />
        <BoardContent board={mockData?.board}/>

        {/* Code gốc */}
        {/* <BoardBar board={board} />
        <BoardContent board={board}/> */}
      </Container>
    </>
  )
}

export default Board
