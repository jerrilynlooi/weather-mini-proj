import * as types from '../types'

const initialState = {
  dayDetailOpen: false,
  payload: null
  //payload: { id: 2158177, name: "Melbourne", country: "Australia", country_code: "AU", latitude: -37.814, longitude: 144.96332, date: new Date(), index: 0 }
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
    
    case types.REMOVE_CITY: // also close detail if city removed
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
