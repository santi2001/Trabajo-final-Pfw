import { Button, Typography } from '@material-ui/core'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ROUTES } from '~/views/routes'
import { Link } from 'react-router-dom'
import logo from '~/assets/logo.png'
import view1 from '~/assets/view1.png'
import view2 from '~/assets/view2.png'
import view3 from '~/assets/view3.png'
import { NavBar, Footer } from '~/views/pages/shared'
import { useStyles } from './HomePage.style'
export const HomePage = () => {
  const classes = useStyles()
  const settings = {
    className: classes.slickSlider,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    lazyLoad: true,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }
  const array = [logo, view1, view2, view3]
  return (
    <div className={classes.container}>
      <NavBar />
      <div className={classes.mainContainer}>
        <header>
          <div className={classes.previewImage}>
            <div className={classes.containerHeader}>
              <Typography className={classes.title} component='h5'>
                Shadow Gluttony
              </Typography>
              <Typography className={classes.subtitle}>Alguna frase llamativa</Typography>
            </div>
          </div>
        </header>
        <div className={classes.bodyContainer}>
          <Typography variant='h5' color='primary'>
            Recorrido
          </Typography>
          <Slider {...settings}>
            {array.map((e, i) => (
              <div key={i}>
                <img src={e} alt='img' className={classes.image} />
              </div>
            ))}
          </Slider>
          <Link
            component={Button}
            to={ROUTES.GAME}
            variant='contained'
            color='primary'
            className={classes.button}>
            Empezar a Jugar
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
