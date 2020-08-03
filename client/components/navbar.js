import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'
import cat from '../../client/images/pet.png'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="header">
    <nav className="navbar">
      {isLoggedIn ? (
        <div className="total-nav-container">
          <div className="cat-title">
            <img src={cat} height="30px" width="30px" />
            <p className="title">stoop</p>
          </div>
          {/* The navbar will show these links after you log in */}
          <div className="nav-container">
            <NavLink
              to="/catmap"
              className="nav-item"
              activeClassName="selected"
            >
              cat map
            </NavLink>
            <NavLink to="/add" className="nav-item" activeClassName="selected">
              add a spot
            </NavLink>
            <NavLink to="/home" className="nav-item" activeClassName="selected">
              my spots
            </NavLink>
            <a className="nav-item" href="#" onClick={handleClick}>
              logout
            </a>
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <NavLink to="/login">login</NavLink>
          <NavLink to="/signup">sign up</NavLink>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
