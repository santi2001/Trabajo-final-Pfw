import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('lg')]: {
      minHeight: '65vh'
    }
  },
  phaser: {
    margin: '100px auto',
    width: '60%',
    [theme.breakpoints.up('md')]: {
      width: 1200
    }
  }
}))
