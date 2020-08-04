import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const LoginForm = props => {
  const {name, handleSubmit, error} = props

  return (
    <div className="identity-form">
      <form onSubmit={handleSubmit} name={name}>
        <div className="container">
          <p className="form-title">log in</p>
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
              <button type="submit">Log In</button>
            </div>
          </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">Log In with Google</a>
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
const mapLogin = state => {
  return {
    name: 'login',
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
      dispatch(auth(formName, email, password))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(LoginForm)

/**
 * PROP TYPES
 */
Login.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
