// src/utils/weatherUtils.js
export const processWeatherData = (weatherData) => {
  if (!weatherData || !weatherData.daily) {
    return [];
  }

  const { daily } = weatherData;
  const processedDays = [];

  // Process each day (usually 7 days)
  for (let i = 0; i < daily.time.length; i++) {
    const date = new Date(daily.time[i]);
    
    processedDays.push({
      date: daily.time[i],
      high: Math.round(daily.temperature_2m_max[i]),
      low: Math.round(daily.temperature_2m_min[i]),
      weatherCode: daily.weathercode[i],
      formattedDate: formatDate(date)
    });
  }

  return processedDays;
};

export const formatDate = (date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  
  return `${dayName} ${day} ${month}`;
};

export const getWeatherIcon = (weatherCode) => {
  // Weather code mapping - you can expand this
  const weatherIcons = {
    0: '☀️', // Clear sky
    1: '🌤️', // Mainly clear
    2: '⛅', // Partly cloudy
    3: '☁️', // Overcast
    45: '🌫️', // Fog
    48: '🌫️', // Depositing rime fog
    51: '🌦️', // Light drizzle
    53: '🌦️', // Moderate drizzle
    55: '🌦️', // Dense drizzle
    61: '🌧️', // Slight rain
    63: '🌧️', // Moderate rain
    65: '🌧️', // Heavy rain
    71: '🌨️', // Slight snow
    73: '🌨️', // Moderate snow
    75: '🌨️', // Heavy snow
    95: '⛈️', // Thunderstorm
  };
  
  return weatherIcons[weatherCode] || '🌡️';
};