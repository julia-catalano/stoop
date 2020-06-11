import * as React from 'react'
import {PureComponent} from 'react'
import {Marker} from 'react-map-gl'
import catjpg from '../images/cat.jpg'

// Though the sequelize type is set to decimal, sequelize converts decimals to a string in response - parseFloat might mess with precision a bit but need to convert this returned string to a number
export default class Markers extends PureComponent {
  render() {
    const {data} = this.props
    return data.map(cat => (
      <Marker
        key={cat.id}
        longitude={parseFloat(cat.longitude)}
        latitude={parseFloat(cat.latitude)}
      >
        <img src={catjpg} />
      </Marker>
    ))
  }
}
