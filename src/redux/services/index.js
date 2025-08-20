export const weatherService = {

  async geocodeCity(cityName) {
    const response = await fetch(`/api/geocode?city=${encodeURIComponent(cityName)}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to geocode city')
    }
    return response.json()
  },

  async fetchDailyWeather(latitude, longitude) {
    const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}&type=daily`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch weather data')
    }
    return response.json()
  },

  async fetchHourlyWeather(latitude, longitude, date) {
    const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}&type=hourly&date=${date}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch hourly weather data')
    }
    return response.json()
  }
}
