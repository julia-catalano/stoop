import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

export class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.loginClick = this.loginClick.bind(this)
    this.signupClick = this.signupClick.bind(this)
  }

  loginClick() {
    window.location.pathname = '/login'
  }

  signupClick() {
    window.location.pathname = '/signup'
  }

  render() {
    if (this.props.user.id) {
      return <Redirect to="/home" />
    }

    return (
      <div className="home-container">
        <div className="heading">
          <h4>Stoop</h4>
        </div>

        <div className="button-container">
          <button type="login" onClick={this.loginClick}>
            Login
          </button>
        </div>

        <div className="button-container">
          <button type="signup" onClick={this.signupClick}>
            Sign Up
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(LandingPage)
