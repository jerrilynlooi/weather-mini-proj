import * as types from '../types'

const initialState = {
  dayDetailOpen: false,
  payload: null
}

const dayReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_DAY_DETAIL:
      return {
        ...state,
        payload: action.payload,
        dayDetailOpen: true
      }
    
    case types.CLOSE_DAY_DETAIL:
      return {
        ...state,
        dayDetailOpen: false,
        payload: null
      }
    
    default:
      return state
  }
}

export default dayReducer
