import * as React from 'react'
import {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Marker, Popup} from 'react-map-gl'
import catjpg from '../images/cat.jpg'
import catpng from '../images/pet.png'
import {selectACat, toggleCat} from '../store/cat'
let lat
let long

// Though the sequelize type is set to decimal, sequelize converts decimals to a string in response - parseFloat might mess with precision a bit but need to convert this returned string to a number
class Markers extends PureComponent {
  render() {
    const catState = this.props.catState
    return (
      <div>
        {catState.cats.map(cat => (
          <Marker
            key={cat.id}
            longitude={parseFloat(cat.longitude)}
            latitude={parseFloat(cat.latitude)}
          >
            <img
              onClick={() => this.props.selectACat(cat)}
              src={catpng}
              alt="cat map marker"
              height="40px"
              width="40px"
            />
          </Marker>
        ))}
        {catState.showPopUp && (
          <Popup
            latitude={parseFloat(catState.selectedCat.latitude)}
            longitude={parseFloat(catState.selectedCat.longitude)}
            closeButton={true}
            onClose={() => this.props.toggleCat()}
          >
            {catState.selectedCat.name}
            <img src={catState.selectedCat.imageUrl} />
            {catState.selectedCat.time}
          </Popup>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  catState: state.cat
})

const mapDispatchToProps = dispatch => ({
  selectACat: cat => dispatch(selectACat(cat)),
  toggleCat: () => dispatch(toggleCat())
})

export default connect(mapStateToProps, mapDispatchToProps)(Markers)
