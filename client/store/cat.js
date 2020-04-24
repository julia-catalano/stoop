import axios from 'axios'

//ACTION TYPES
const ADD_CAT = 'ADD_CAT'
const GET_ALL_CATS = 'GET_ALL_CATS'

//INITIAL STATE
const initialCatState = {
  cats: [],
  selectedCat: {}
}

//ACTION CREATORS
const addCat = cat => ({type: ADD_CAT, cat})

const getAllCats = cats => ({type: GET_ALL_CATS, cats})

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
    default:
      return catState
  }
}
