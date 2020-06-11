import axios from 'axios'

//ACTION TYPES
const ADD_CAT = 'ADD_CAT'
const GET_ALL_CATS = 'GET_ALL_CATS'
const SELECT_A_CAT = 'SELECT_A_CAT'

//INITIAL STATE
const initialCatState = {
  cats: [],
  selectedCat: {}
}

//ACTION CREATORS
const addCat = cat => ({type: ADD_CAT, cat})

const getAllCats = cats => ({type: GET_ALL_CATS, cats})

export const selectACat = cat => ({type: SELECT_A_CAT, cat})

//THUNK CREATORS

export const addCatThunk = cat => async dispatch => {
  try {
    const {data} = await axios.post('/api/cats', cat)
    dispatch(addCat(data))
  } catch (error) {
    console.error(error)
  }
}

export const getAllCatsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cats')
    dispatch(getAllCats(data))
  } catch (err) {
    console.error(err)
  }
}
//REDUCER

export default function catReducer(catState = initialCatState, action) {
  switch (action.type) {
    case ADD_CAT:
      return {...catState, cats: [...catState.cats, action.cat]}
    case GET_ALL_CATS:
      return {...catState, cats: action.cats}
    case SELECT_A_CAT:
      return {...catState, selectedCat: action.cat}
    default:
      return catState
  }
}
