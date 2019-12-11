import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'

const App = ({isLoggedIn}) => {
  return (
    <div>
      {isLoggedIn ? <Navbar /> : null}
      <Routes />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapStateToProps)(App)
