import { Typography } from '@material-ui/core'
import React from 'react'
import { NavBar, Footer } from '~/views/pages/shared'
import { useStyles } from './UsPage.style'
export const UsPage = () => {
  const classes = useStyles()
  return (
    <div>
      <NavBar />
      <main className={classes.mainContainer}>
        <section className={classes.container}>
          <div>
            <div className={classes.logo}></div>
            <Typography variant='h2'>Los panas</Typography>
          </div>
          <aside className={classes.aside}>
            <div className={classes.card}>
              <div className={`${classes.image} santiago`}></div>
              <div>
                <Typography variant='h4'>Santiago Churquina</Typography>
                <Typography variant='h5'>Desarrollador Full Stack</Typography>
              </div>
            </div>
            <div className={classes.card}>
              <div className={`${classes.image} luis`}></div>
              <div>
                <Typography variant='h4'>Luis Carlos Barrionuevo</Typography>
                <Typography variant='h5'>Desarrollador Full Stack</Typography>
              </div>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  )
}
