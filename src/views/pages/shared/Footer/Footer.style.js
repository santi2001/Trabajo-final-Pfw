import { makeStyles } from '@material-ui/styles'
export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: 240,
    padding: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up('xl')]: {
      width: 1920
    }
  },
  footerBlock: {
    display: 'inline-block',
    paddingLeft: theme.spacing(10),
    listStyle: 'none',
    '& li': {
      paddingBottom: theme.spacing()
    },
    '& a': {
      color: theme.palette.primary.main,
      fontSize: '1rem',
      textDecoration: 'none',
      fontWeight: 500
    },
    [theme.breakpoints.up('md')]: {
      margin: 0
    }
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    },
    [theme.breakpoints.up('lg')]: {
      margin: '0 auto',
      width: 1280
    }
  }
}))
