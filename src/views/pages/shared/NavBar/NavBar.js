import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Button } from '@material-ui/core'
import { ROUTES } from '~/views/routes'

export const NavBar = () => {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <Link
          to={ROUTES.ROOT}
          style={{ flexGrow: 1, textDecoration: 'none', color: '#ffff' }}>
          nombre juego
        </Link>

        <Link
          to={ROUTES.GAME}
          variant='outlined'
          color='inherit'
          component={Button}>
          Empezar a Jugar
        </Link>
      </Toolbar>
    </AppBar>
  )
}
