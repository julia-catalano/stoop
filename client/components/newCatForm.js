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
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <h4> spotted! </h4>
            <div className="form-fields">
              <div className="input-box">
                <p className="field-title">name your spot </p>
                <input
                  name="name"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </div>
              <div className="input-box">
                <p className="field-title">when </p>
                <input
                  name="time"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.time}
                />
              </div>
              <div className="button-container">
                <button type="button" onClick={this.locateMe}>
                  use my location!
                </button>
              </div>
              <div className="input-box">
                <p className="field-title">where - latitude </p>
                <input
                  name="latitude"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.latitude}
                />
              </div>
              <div className="input-box">
                <p className="field-title">where - longitude </p>
                <input
                  name="longitude"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.longitude}
                />
              </div>
              <div className="button-container">
                <button type="button" onClick={this.openWidget}>
                  pic (or it didn't happen!){' '}
                </button>
              </div>
              <div className="submitButton-container">
                <button type="submit">Spot!</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addCat: cat => dispatch(addCatThunk(cat))
})

export default connect(null, mapDispatchToProps)(NewCatForm)
