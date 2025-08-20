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
    
    case types.REMOVE_CITY:
      // Close day detail if the removed city matches the currently open detail
      if (state.payload && state.payload.id === action.payload) {
        return {
          ...state,
          dayDetailOpen: false,
          payload: null
        }
      }
      return state
      
    default:
      return state
  }
}

export default dayReducer
