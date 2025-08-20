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
      ? `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code,visibility_min,uv_index_max&timezone=Australia%2FSydney&forecast_days=14`
      : (type == 'hourly')  
      ? `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code,precipitation_probability,wind_speed_10m&timezone=auto&start_date=${date}&end_date=${date}`
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
