import { Box, Tooltip } from '@mui/material'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root':{
    color: 'white'
  },
  '&:hover':{
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingX: 2,
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      borderBottom: '1px solid white'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="MERN stack board"
          clickable
          // onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
          // onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to drive"
          clickable
          // onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
          // onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
          // onClick={() => {}}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx = {{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >Invite
        </Button>

        <AvatarGroup
          max={4}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root':{
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none'
            }
          }}>
          <Tooltip title="Yellow Angry Bird">
            <Avatar
              alt="Yellow Angry Bird"
              src="https://static.wikia.nocookie.net/angrybirds/images/a/a1/Yellow_23.png" />
          </Tooltip>
          <Tooltip title="Brown Angry Bird">
            <Avatar
              alt="Brown Angry Bird"
              src="https://i5.walmartimages.com/seo/Angry-Birds-Vinyl-Character-Terence_eef99659-9b4f-4804-ab92-c7b499f43744_2.c7c2157c013ab579f6e040c28912af9b.jpeg" />
          </Tooltip>
          <Tooltip title="Pink Angry Bird">
            <Avatar
              alt="Pink Angry Bird"
              src="https://angrybirds2.rovio.com/hc/article_attachments/9422034471442" />
          </Tooltip>
          <Tooltip title="Angry Bird">
            <Avatar
              alt="Angry Bird"
              src="https://static.wikia.nocookie.net/angrybirds/images/a/a1/Yellow_23.png" />
          </Tooltip>
          <Tooltip title="Angry Bird">
            <Avatar
              alt="Angry Bird"
              src="https://static.wikia.nocookie.net/angrybirds/images/a/a1/Yellow_23.png" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
