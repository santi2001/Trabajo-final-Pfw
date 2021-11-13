import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage } from '~/views/pages/HomePage'
import { GamePage } from '~/views/pages/GamePage'

import { SignInPage, SignUpPage } from '~/views/pages/Auth'
import { ROUTES } from '~/views/routes'
export const App = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.ROOT} component={HomePage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.GAME} component={GamePage} />
    </Switch>
  )
}

export default App
