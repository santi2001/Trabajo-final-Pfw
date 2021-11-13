import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
// import AccountCircle from '@material-ui/icons/AccountCircle'

// import MenuItem from '@material-ui/core/MenuItem'
// import Menu from '@material-ui/core/Menu'

export const NavBar = () => {
  // const [auth] = useState(false)
  // const [anchorEl, setAnchorEl] = useState(null)
  // // const handleChange = (event) => {
  // //   setAuth(event.target.checked)
  // // }

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleClose = () => {
  //   setAnchorEl(null)
  // }

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          nombre juego
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
