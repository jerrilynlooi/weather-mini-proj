import { combineReducers } from 'redux'
import weatherReducer from './weatherReducer'
import dayReducer from './dayReducer'

const reducers = {
  weather: weatherReducer,
  day: dayReducer
}

const rootReducer = combineReducers(reducers)

export default rootReducer
