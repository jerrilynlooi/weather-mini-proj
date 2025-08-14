export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return Response.json({ error: 'City is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return Response.json({ error: 'City not found' }, { status: 404 });
    }

    const result = data.results[0];
    
    return Response.json({
      id: result.id,
      name: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
    });
  } catch (error) {
    console.error('Geocoding API error:', error);
    return Response.json({ error: 'Failed to geocode city' }, { status: 500 });
  }
} 