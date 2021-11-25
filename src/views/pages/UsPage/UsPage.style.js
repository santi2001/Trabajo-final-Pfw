import { makeStyles } from '@material-ui/core'
import logo from '~/assets/logo.jpg'
import santiProfile from '~/assets/santiagochurquina.jpeg'
import luisProfile from '~/assets/luisbarrionuevo.jpg'
export const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '72vh',
    backgroundColor: theme.palette.background.default,
    margin: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row'
    }
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 100,
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row'
    }
  },
  card: {
    display: 'flex',

    alignItems: 'center',
    marginBottom: 50,
    maxWidth: 500
  },
  aside: {
    padding: theme.spacing(2),

    [theme.breakpoints.up('lg')]: { marginLeft: 300 }
  },
  logo: {
    background: `url(${logo})`,
    width: 150,
    height: 150,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: 40,
    marginBottom: 20
  },
  image: {
    '&.santiago': {
      background: `url(${santiProfile})`,
      width: 100,
      height: 100,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: 100,
      marginRight: theme.spacing(4),
      [theme.breakpoints.up('lg')]: {
        width: 150,
        height: 150
      }
    },
    '&.luis': {
      background: `url(${luisProfile})`,
      width: 100,
      height: 100,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: 100,
      marginRight: theme.spacing(4),
      [theme.breakpoints.up('lg')]: {
        width: 150,
        height: 150
      }
    }
  }
}))
