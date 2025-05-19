import { useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns, createNewColumn, createNewCard }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter column title')
      return
    }

    const newColumnData = {
      title: newColumnTitle
    }
    /** Gọi lên props function createNewColumn nằm ở component cha cao nhất
     * Gọi luôn API ở đây thay vì việc phải gọi API lần lượt ngược lên các cấp trên
     * Với việc sử dụng Redux thì code sẽ clean hơn
     */
    await createNewColumn(newColumnData)

    // Close form
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  return (
    /***
    * The <SortableContext> component requires that you pass it the sorted array of the unique identifiers associated to each sortable item via the items prop.
    * This array should look like ["1", "2", "3"], not [{id: "1"}, {id: "2}, {id: "3}].
     ***/
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m:2 }
      }}>
        {/* Cách viết đầy đủ để sau này xử lý logic khi cần còn k xử lý gì có thể viết
        {columns?.map((column) => {
          return <Column key={column._id} />
        })}
        */}

        {columns?.map(column => <Column key={column._id} column={column} createNewCard = {createNewCard}/>)}
        {!openNewColumnForm 
          ? <Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}>
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
            >
                Add new column</Button>
          </Box>
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              label="Enter column title...."
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value = {newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset':{ borderColor: 'white' },
                  '&:hover fieldset':{ borderColor: 'white' },
                  '&.Mui-focused fieldset':{ borderColor: 'white' }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={addNewColumn}
                variant="contained"
                color="success"
                size="small"
                sx = {{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.light, boxShadow: 'none' }
                }}
              >Add Column</Button>
              <CloseIcon
                fontSize="small"
                sx = {{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: (theme) => theme.palette.warning.light }
                }}
                onClick = {toggleOpenNewColumnForm}
              />
            </Box>
          </Box>}
        {/* Box add new column CTA */}
      </Box>
    </SortableContext>
  )
}

export default ListColumns