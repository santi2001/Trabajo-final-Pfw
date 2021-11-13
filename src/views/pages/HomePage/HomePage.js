import { Typography } from '@material-ui/core'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
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
  const array = [
    'https://cdn.mos.cms.futurecdn.net/7vTk57eCSapaCbb4vaNGz7.jpg',
    'https://m.media-amazon.com/images/I/812CrerASqL._AC_SX466_.jpg',
    'https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg',
    'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2021/01/14/949612-first-slide.jpg'
  ]
  return (
    <div className={classes.container}>
      <NavBar />
      <div className={classes.mainContainer}>
        <header>
          <div className={classes.previewImage}>
            <div className={classes.containerHeader}>
              <Typography className={classes.title} component='h5'>
                Nombre Del Juego
              </Typography>
              <Typography className={classes.subtitle}>
                Alguna frase llamativa
              </Typography>
            </div>
          </div>
        </header>
        <div className={classes.bodyContainer}>
          <Typography variant='h5' color='primary' style={{ marginBottom: 30 }}>
            Recorrido
          </Typography>
          <Slider {...settings}>
            {array.map((e, i) => (
              <div key={i}>
                <img src={e} alt='img' className={classes.image} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Footer />
    </div>
  )
}
