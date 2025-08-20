export const selectWeatherForCity = (state, cityId) => state.weather.weatherData[cityId]

export const selectHourlyWeatherForLocation = (state, latitude, longitude, date) => {
  const key = `${latitude}-${longitude}-${date}`
  return state.weather.hourlyWeatherData[key]
}