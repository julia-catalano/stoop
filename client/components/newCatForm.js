import React from 'react'
import {connect} from 'react-redux'
import {addCatThunk} from '../store/cat'

class NewCatForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      time: '',
      latitude: null,
      longitude: null,
      imageUrl: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.locateMe = this.locateMe.bind(this)
  }

  handleChange(event) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addCat(this.state)
    console.log('hello kitty', this.state)
    this.setState({
      name: '',
      time: '',
      latitude: null,
      longitude: null,
      imageUrl: ''
    })
  }

  locateMe() {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      err => {
        console.log(err)
      }
    )
  }

  openWidget = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'stoopcats',
          uploadPreset: 'pejycidk',
          sources: ['local', 'camera', 'instagram']
        },
        (error, result) => {
          if (result.event === 'success') {
            this.setState({
              imageUrl: result.info.secure_url
            })
          } else {
            console.error(error)
          }
        }
      )
      .open()
  }

  render() {
    return (
      <div className="newCatForm">
        <h4> Spotted! </h4>
        <form onSubmit={this.handleSubmit}>
          Name:{' '}
          <input
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          When:{' '}
          <input
            name="time"
            onChange={this.handleChange}
            value={this.state.time}
          />
          Where - latitude:{' '}
          <input
            name="latitude"
            onChange={this.handleChange}
            value={this.state.latitude}
          />
          Where - longitude:{' '}
          <input
            name="longitude"
            onChange={this.handleChange}
            value={this.state.longitude}
          />
          <button type="button" onClick={this.locateMe}>
            Use My Spot!
          </button>
          <button type="button" onClick={this.openWidget}>
            Pic (or it didn't happen!):{' '}
          </button>
          <button type="submit">Spot!</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addCat: cat => dispatch(addCatThunk(cat))
})

export default connect(null, mapDispatchToProps)(NewCatForm)
