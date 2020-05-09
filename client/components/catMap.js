import React from 'react'
import {connect} from 'react-redux'
import {getAllCatsThunk} from '../store/cat'
import {shiftViewport} from '../store/map'
import MapGL from 'react-map-gl'
import token from '../../secrets.js'

class CatMap extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllCats()
  }

  render() {
    return (
      <div>
        <h1>local spots</h1>
        <div>{this.props.cats.map(cat => <h2>{cat.name}</h2>)}</div>
        <div className="map">
          <MapGL
            {...this.props.viewport}
            onViewportChange={viewport => this.props.shiftViewport(viewport)}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken={token}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cats: state.cat.cats,
  viewport: state.map.viewport
})

const mapDispatchToProps = dispatch => ({
  getAllCats: () => dispatch(getAllCatsThunk()),
  shiftViewport: newViewport => dispatch(shiftViewport(newViewport))
})

export default connect(mapStateToProps, mapDispatchToProps)(CatMap)
