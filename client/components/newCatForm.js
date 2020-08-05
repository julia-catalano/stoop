import React from 'react'
import {connect} from 'react-redux'
import {addCatThunk} from '../store/cat'
import Loader from 'react-loader-spinner'
import catimg from '../images/pet.png'

class NewCatForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      time: '',
      latitude: null,
      longitude: null,
      imageUrl: '',
      hideUser: false,
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.locateMe = this.locateMe.bind(this)
    this.toggleUser = this.toggleUser.bind(this)
  }

  handleChange(event) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    console.log('before', this.state)
    await this.assignTime()
    console.log('does this do something', this.state)
    this.props.addCat(this.state)
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
    this.setState({loading: true})
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false
        })
      },
      err => {
        console.log(err)
      }
    )
  }

  assignTime() {
    let today = new Date()
    let date =
      today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear()
    let time = today.getHours() + ':' + today.getMinutes()
    let dateTime = date + ' at ' + time
    this.setState({
      time: dateTime
    })
    return 'finished'
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

  toggleUser() {
    this.setState(prevState => ({hideUser: !prevState.hideUser}))
  }

  render() {
    return (
      <div className="newCatForm">
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="title-image">
              <img src={catimg} />
              <p className="form-title"> spotted! </p>
            </div>
            <div className="form-fields">
              <div className="input-box">
                <input
                  name="name"
                  className="form-control"
                  placeholder="name your cat"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </div>
              <div className="locate-container">
                <div className="button-container">
                  <button type="button" onClick={this.locateMe}>
                    use my location!
                  </button>
                </div>
                {this.state.loading ? (
                  <Loader type="Grid" color="#F4705A" height={40} width={40} />
                ) : null}
                {this.state.latitude ? "we've got your spot!" : null}
              </div>
              <div className="button-container">
                <button type="button" onClick={this.openWidget}>
                  pic (or it didn't happen!){' '}
                </button>
              </div>
              <div className="toggle-switch-container">
                <p className="field-title">hide my username</p>
                <input
                  type="checkbox"
                  className="toggle-switch"
                  id="toggle-switch-new"
                  checked={this.hideUser}
                  onChange={this.toggleUser}
                />
                <label
                  className="toggle-switch-label"
                  htmlFor="toggle-switch-new"
                >
                  <span className="toggle-switch-button" />
                </label>
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
