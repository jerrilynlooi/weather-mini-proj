export const weatherService = {

	// get city details/coords from name
  async geocodeCity(cityName) {
    const response = await fetch(`/api/geocode?city=${encodeURIComponent(cityName)}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to geocode city')
    }
    return response.json()
  },

	// gets 2-week weather data from city coords
  async fetchDailyWeather(latitude, longitude) {
    const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}&type=daily`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch weather data')
    }
    return response.json()
  },

	// gets 24-hour weather data from city coords and date
  async fetchHourlyWeather(latitude, longitude, date) {
    const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}&type=hourly&date=${date}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch hourly weather data')
    }
    return response.json()
  }
}
