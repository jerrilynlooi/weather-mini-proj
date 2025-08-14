export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const date = searchParams.get('date');

  if (!lat || !lon || !type) {
    return Response.json({ error: 'Coordinates and forecast type required' }, { status: 400 });
  }
  if (type === 'hourly' && !date) {
    return Response.json({ error: 'Date is required for hourly forecasts' }, { status: 400 });
  }

  try {
    const url = (type == 'daily')
      ? `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=Australia%2FSydney`
      : (type == 'hourly')  
      ? `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=auto&start_date=${date}&end_date=${date}`
      : null ;
    
    if (url == null) { throw new Error(`Invalid forecast type: ${type}`); }
    const response = await fetch(url);
    if (!response.ok) { throw new Error(`Weather API error: ${response.status}`); }
    const data = await response.json();
    
    if (type === 'daily') {
      if (!data.daily) { return Response.json({ error: 'Daily data not found' }, { status: 404 }); }
      return Response.json(data.daily);
    } else if (type === 'hourly') {
      if (!data.hourly) { return Response.json({ error: 'Hourly data not found' }, { status: 404 }); }
      return Response.json(data.hourly);
    }

  } catch (error) {
    console.error('Weather API error:', error);
    return Response.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
} 

/*

  // Process the hourly data to get daily forecasts
  const dailyForecasts = [];
  const hourlyData = data.hourly;
  
  // Group hourly temperatures by day and calculate min/max
  for (let day = 0; day < 7; day++) {
    const dayStartIndex = day * 24;
    const dayEndIndex = dayStartIndex + 24;
    const dayTemps = hourlyData.temperature_2m.slice(dayStartIndex, dayEndIndex);
    
    const minTemp = Math.min(...dayTemps);
    const maxTemp = Math.max(...dayTemps);
    const avgTemp = dayTemps.reduce((sum, temp) => sum + temp, 0) / dayTemps.length;
    
    const date = new Date(hourlyData.time[dayStartIndex]);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    
    dailyForecasts.push({
      date: date.toISOString(),
      dayName,
      dayDate,
      temp: Math.round(avgTemp),
      temp_max: Math.round(maxTemp),
      temp_min: Math.round(minTemp),
      hourly_temps: dayTemps
    });
  }

  const weatherData = {
    city: city || 'Unknown City',
    latitude: lat,
    longitude: lon,
    timezone: data.timezone,
    current: {
      temp: Math.round(dailyForecasts[0].temp),
      temp_max: dailyForecasts[0].temp_max,
      temp_min: dailyForecasts[0].temp_min,
      dayName: dailyForecasts[0].dayName,
      dayDate: dailyForecasts[0].dayDate
    },
    forecast: dailyForecasts
  };

 */