import * as React from 'react'
import {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Marker, Popup} from 'react-map-gl'
import catjpg from '../images/cat.jpg'
import {selectACat} from '../store/cat'

// Though the sequelize type is set to decimal, sequelize converts decimals to a string in response - parseFloat might mess with precision a bit but need to convert this returned string to a number
class Markers extends PureComponent {
  render() {
    console.log(this.props)
    return this.props.catState.cats.map(cat => (
      <Marker
        key={cat.id}
        longitude={parseFloat(cat.longitude)}
        latitude={parseFloat(cat.latitude)}
      >
        <img onClick={() => this.props.selectACat(cat)} src={catjpg} />
      </Marker>
    ))
  }
}

const mapStateToProps = state => ({
  catState: state.cat
})

const mapDispatchToProps = dispatch => ({
  selectACat: cat => dispatch(selectACat(cat))
})

export default connect(mapStateToProps, mapDispatchToProps)(Markers)
