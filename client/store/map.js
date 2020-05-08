//ACTION TYPES
const SHIFT_VIEW = 'SHIFT_VIEW'

//INITIAL STATE
const initialMapState = {
  viewport: {
    width: '100vw',
    height: '100vh',
    latitude: 40.6600615,
    longitude: -73.9532596,
    zoom: 16
  }
}

//ACTION CREATORS
export const shiftViewport = viewport => ({type: SHIFT_VIEW, viewport})

//REDUCER

export default function mapReducer(mapState = initialMapState, action) {
  switch (action.type) {
    case SHIFT_VIEW:
      return {...mapState, viewport: action.viewport}
    default:
      return mapState
  }
}
