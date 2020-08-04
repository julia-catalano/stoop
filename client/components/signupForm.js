import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const SignUp = props => {
  const {name, handleSubmit, error} = props

  return (
    <div className="identity-form">
      <form onSubmit={handleSubmit} name={name}>
        <div className="container">
          <p className="form-title">sign up</p>
          <div className="form-fields">
            <div className="input-box">
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input
                name="email"
                type="text"
                className="form-control"
                placeholder="e-mail"
              />
            </div>
            <div className="input-box">
              <label htmlFor="username">
                <small>Username</small>
              </label>
              <input
                name="username"
                type="username"
                className="form-control"
                placeholder="username"
              />
            </div>
            <div className="input-box">
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="password"
              />
            </div>
            <div className="submitButton-container">
              <button type="submit">Sign Up</button>
            </div>
          </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">Sign Up with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const username = evt.target.username.value
      dispatch(auth(formName, email, password, username))
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(SignUp)

/**
 * PROP TYPES
 */
Signup.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
