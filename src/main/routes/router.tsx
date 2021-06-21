import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { makeLogin, makeSignUp, makeProfile, makeCommunity, makeGroup, makeUserProfile } from '../factories/pages'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '../adapters/current-account/current-account-adapter'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={makeLogin} />
          <Route path='/signup' exact component={makeSignUp} />
          {/* <Route path='/feed' exact component={Feed} /> */}
          <Route path='/community' exact component={makeCommunity} />
          <Route path='/profile' exact component={makeProfile} />
          <Route path='/group/:id' exact component={makeGroup} />
          <Route path='/user/:id' exact component={makeUserProfile} />
          <Redirect to='/login' path='/' />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
