import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Feed, Group } from '@/presentation/pages/'
import { makeLogin, makeSignUp, makeProfile, makeCommunity, makeGroup } from '../factories/pages'
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
          <Route path='/feed' exact component={Feed} />
          <Route path='/community' exact component={makeCommunity} />
          <Route path='/profile' exact component={makeProfile} />
          <Route path='/group' exact component={makeGroup} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
