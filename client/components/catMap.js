import React from 'react'
import {connect} from 'react-redux'
import {getAllCatsThunk} from '../store/cat'
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react'

class CatMap extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllCats()
  }

  render() {
    const style = {
      width: '300px',
      height: '300px'
    }
    return (
      <div>
        <h1>local spots</h1>
        <div>{this.props.cats.map(cat => <h2>{cat.name}</h2>)}</div>
        <div className="map">
          <Map
            google={this.props.google}
            zoom={10}
            initialCenter={{
              lat: 40.6600615,
              lng: -73.9532596
            }}
            style={style}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cats: state.cat.cats
})

const mapDispatchToProps = dispatch => ({
  getAllCats: () => dispatch(getAllCatsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  GoogleApiWrapper({apiKey: 'AIzaSyA1LJsAQck-ITerB6JBStl9lLhxa5frpck'})(CatMap)
)
