import { weatherService } from '../services'
import * as types from '../types'

// Actions
export const addCity = (city) => ({
  type: types.ADD_CITY,
  payload: city
})
export const removeCity = (cityId) => ({
  type: types.REMOVE_CITY,
  payload: cityId
})

export const updateWeatherData = ({ cityId, data }) => ({
  type: types.UPDATE_WEATHER_DATA,
  payload: { cityId, data }
})
export const updateHourlyWeatherData = ({ key, data }) => ({
  type: types.UPDATE_HOURLY_WEATHER_DATA,
  payload: { key, data }
})

export const setRefreshing = (isRefreshing) => ({
  type: types.SET_REFRESHING,
  payload: isRefreshing
})
export const setLoading = (isLoading) => ({
  type: types.SET_LOADING,
  payload: isLoading
})
export const setError = (error) => ({
  type: types.SET_ERROR,
  payload: error
})

// Async Actions (Thunks)
export const addNewCity = (cityName) => async (dispatch, getState) => {
  dispatch({ type: types.ADD_NEW_CITY_PENDING })
  
  try {
    const geocodeData = await weatherService.geocodeCity(cityName)

    const newCity = {
      id: geocodeData.id,
      name: geocodeData.name,
      country: geocodeData.country,
      latitude: geocodeData.latitude,
      longitude: geocodeData.longitude,
    }

    const state = getState()
    const existingCity = state.weather.cities.find(city => city.id === geocodeData.id)
    if (existingCity) {
      dispatch({ type: types.ADD_NEW_CITY_SUCCESS })
      return { success: true, city: newCity }
    }
    
    dispatch(addCity(newCity))

    const weatherData = await weatherService.fetchDailyWeather(newCity.latitude, newCity.longitude)
    dispatch(updateWeatherData({ cityId: newCity.id, data: weatherData }))
    console.log(weatherData)

    dispatch({ type: types.ADD_NEW_CITY_SUCCESS })
    return { success: true, city: newCity }
  } catch (error) {
    dispatch({ type: types.ADD_NEW_CITY_FAILURE, payload: error.message })
    return { success: false, error: error.message }
  }
}

export const refreshAllWeatherData = () => async (dispatch, getState) => {
  const state = getState()
  const cities = state.weather.cities
  
  if (cities.length === 0) return

  dispatch(setRefreshing(true))
  dispatch({ type: types.REFRESH_ALL_WEATHER_DATA_PENDING })
  
  try {
    const promises = cities.map(async (city) => {
      try {
        const weatherData = await weatherService.fetchDailyWeather(city.latitude, city.longitude)
        dispatch(updateWeatherData({ cityId: city.id, data: weatherData }))
      } catch (error) {
        console.error(`Weather fetch error for ${city.name}:`, error)
      }
    })

    await Promise.all(promises)
    dispatch(refreshHourlyWeatherData())
    dispatch({ type: types.REFRESH_ALL_WEATHER_DATA_SUCCESS })
  } catch (error) {
    dispatch({ type: types.REFRESH_ALL_WEATHER_DATA_FAILURE, payload: error.message })
  } finally {
    dispatch(setRefreshing(false))
  }
}

export const fetchHourlyWeatherData = ({ latitude, longitude, date }) => async (dispatch) => {
  try {
    const weatherData = await weatherService.fetchHourlyWeather(latitude, longitude, date)
    const key = `${latitude}-${longitude}-${date}`
    dispatch(updateHourlyWeatherData({ key, data: weatherData }))

    return { success: true, data: weatherData }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const refreshHourlyWeatherData = () => async (dispatch, getState) => {
  const state = getState()
  if (!state.day.dayDetailOpen || !state.day.payload) return

  const { latitude, longitude, date } = state.day.payload
  await dispatch(fetchHourlyWeatherData({ latitude, longitude, date }))
}
