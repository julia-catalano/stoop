import * as React from 'react'
import {PureComponent} from 'react'
import {Marker} from 'react-map-gl'

export default class Markers extends PureComponent {
  render() {
    const {data} = this.props
    return data.map(cat => (
      <Marker key={cat.id} longitude={cat.longitude} latitude={cat.latitude}>
        <img src="pin.png" />
      </Marker>
    ))
  }
}
