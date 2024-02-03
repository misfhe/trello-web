import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'

import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'


const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  //https://docs.dndkit.com/api-documentation/sensors
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  // Yêu cầu chuột di chuyển 10px mới kích hoạt event (tránh trường hợp click vào column vẫn gọi event)
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  //Nhấn giữ 250ms và dung sai của cảm ứng 500 thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  //cùng một thời điểm chỉ có một phần tử được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  //trigger khi bắt đầu kéo 1 phần tử (drag)
  const handleDragStart = (event) => {
    // console.log('Handle drag start: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  //trigger khi kết thúc hành động kéo (drop)
  const handleDragEnd = (event) => {
    const { active, over } = event

    // Kiểm tra nếu over không tồn tại (kéo linh tinh ra khỏi label của Board)
    if (!over) return

    if (active.id !== over.id) {
      //Lấy vị trí cũ
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      //Lấy vị trí mới
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      //docs code cua arrayMove (di chuyển 1 phần tử của mảng từ vị trí from tới to)
      // https://github.com/clauderic/dnd-kit/blob/master/packages/sortable/src/utilities/arrayMove.ts
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

      //cập nhật thứ tự cột
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)

  }

  //Animation khi thả phần tử ra (drop)
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active:{ opacity: '0.5' } } })
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns = { orderedColumns }/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType===ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column = {activeDragItemData}/>}
          {(activeDragItemType===ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card = {activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
