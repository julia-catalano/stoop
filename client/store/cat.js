import axios from 'axios'

//ACTION TYPES
const ADD_CAT = 'ADD_CAT'

//INITIAL STATE
const initialCatState = {
  cats: [],
  selectedCat: {}
}

//ACTION CREATORS
const addCat = cat => ({type: ADD_CAT, cat})

//THUNK CREATORS

export const addCatThunk = cat => async dispatch => {
  console.log('this is the cat', cat)
  try {
    const {data} = await axios.post('/api/cats', cat)
    dispatch(addCat(data))
  } catch (error) {
    console.error(error)
  }
}

//REDUCER

export default function catReducer(catState = initialCatState, action) {
  switch (action.type) {
    case ADD_CAT:
      return {...catState, cats: [...catState.cats, action.cat]}
    default:
      return catState
  }
}
