import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#161E54'
  },
  mainContainer: {
    minHeight: '75vh'
  },
  containerHeader: {
    width: '50%',
    height: '50%'
  },
  bodyContainer: {
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%'
  },
  previewImage: {
    display: 'flex',
    marginTop: 67,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 500,
    alignItems: 'end',
    backgroundImage:
      'url(https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2019/12/20/plwijovwbm4jfialzvv5/gaming-in-2020-best-games)'
  },
  title: {
    color: '#ffff',
    fontSize: '2.5rem',
    marginBottom: 20
  },
  subtitle: {
    color: '#ffff',
    fontSize: '1.5rem'
  },
  slickSlider: {
    width: '100%',
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: 300,
    [theme.breakpoints.up('lg')]: {
      width: '90%'
    }
  }
}))
