import React, {Suspense} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {CContainer, CFade} from '@coreui/react'

// routes config
import routes from '../routes'

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => {
                      let role = localStorage.getItem('user_type');
                      if (route.allowed.includes(role)) return (
                          <CFade>
                              <route.component {...props} />
                          </CFade>
                      )
                      if (role === 'admin_dicota')
                          return <Redirect to="/dashboard"/>
                      else if (role === 'creator')
                          return <Redirect to="/creator/dashboard"/>
                      else if (role === 'user')
                          return <Redirect to="/user-landing"/>
                  }}
                />
              )
            })}
              {
                  localStorage.getItem('user_type') === 'admin_dicota' ?
                      <Redirect from="/" to="/dashboard" /> :
                      <Redirect from="/" to="/creator/dashboard" />
              }
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
