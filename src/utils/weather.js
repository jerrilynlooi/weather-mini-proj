const weatherCodeMap = {
  0: { icon: "☀️", description: "Clear sky" },
  1: { icon: "🌤️", description: "Mainly clear" },
  2: { icon: "⛅", description: "Partly cloudy" },
  3: { icon: "☁️", description: "Overcast" },
  45: { icon: "🌫️", description: "Fog" },
  48: { icon: "🌫️", description: "Depositing rime fog" },
  51: { icon: "🌦️", description: "Light drizzle" },
  53: { icon: "🌦️", description: "Moderate drizzle" },
  55: { icon: "🌦️", description: "Dense drizzle" },
  56: { icon: "🌨️", description: "Light freezing drizzle" },
  57: { icon: "🌨️", description: "Dense freezing drizzle" },
  61: { icon: "🌧️", description: "Slight rain" },
  63: { icon: "🌧️", description: "Moderate rain" },
  65: { icon: "🌧️", description: "Heavy rain" },
  66: { icon: "🌨️", description: "Light freezing rain" },
  67: { icon: "🌨️", description: "Heavy freezing rain" },
  71: { icon: "❄️", description: "Slight snow fall" },
  73: { icon: "❄️", description: "Moderate snow fall" },
  75: { icon: "❄️", description: "Heavy snow fall" },
  77: { icon: "❄️", description: "Snow grains" },
  80: { icon: "🌦️", description: "Slight rain showers" },
  81: { icon: "🌧️", description: "Moderate rain showers" },
  82: { icon: "⛈️", description: "Violent rain showers" },
  85: { icon: "🌨️", description: "Slight snow showers" },
  86: { icon: "❄️", description: "Heavy snow showers" },
  95: { icon: "⛈️", description: "Thunderstorm" },
  96: { icon: "⛈️", description: "Thunderstorm with slight hail" },
  99: { icon: "⛈️", description: "Thunderstorm with heavy hail" }
};

export function getWeatherInfo(code) {
  return weatherCodeMap[code] || { 
    icon: "❓", 
    description: "Unknown weather condition" 
  };
}