import * as types from '../types'

const initialState = {
  cities: [
    {
      id: 2158177, // Start with melbourne weather card by default !
      name: "Melbourne",
      country: "Australia",
      latitude: -37.814,
      longitude: 144.96332,
    }
  ],
  weatherData: {},
  hourlyWeatherData: {}, 
  refreshing: false,
  loading: false,
  error: null
}

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.ADD_CITY:
      return {
        ...state,
        cities: [...state.cities, action.payload]
      }
    case types.REMOVE_CITY:
      const newWeatherData = { ...state.weatherData }
      delete newWeatherData[action.payload]
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload),
        weatherData: newWeatherData
      }
    
    case types.UPDATE_WEATHER_DATA:
      const { cityId, data } = action.payload
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          [cityId]: data
        }
      }
    case types.UPDATE_HOURLY_WEATHER_DATA:
      const { key, data: hourlyData } = action.payload
      return {
        ...state,
        hourlyWeatherData: {
          ...state.hourlyWeatherData,
          [key]: hourlyData
        }
      }
    
    case types.SET_REFRESHING: return { ...state, refreshing: action.payload }
    case types.SET_LOADING: return {...state, loading: action.payload }
    case types.SET_ERROR: return { ...state, error: action.payload }
    
    // Async
    case types.ADD_NEW_CITY_PENDING: return { ...state, loading: true, error: null }
    case types.ADD_NEW_CITY_SUCCESS: return { ...state, loading: false }
    case types.ADD_NEW_CITY_FAILURE: return { ...state, loading: false, error: action.payload }
    case types.REFRESH_ALL_WEATHER_DATA_PENDING: return { ...state, refreshing: true }
    case types.REFRESH_ALL_WEATHER_DATA_SUCCESS: return { ...state, refreshing: false }
    case types.REFRESH_ALL_WEATHER_DATA_FAILURE: return { ...state, refreshing: false }
    
    default: return state
  }
}

export default weatherReducer
