import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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

export const addNewCity = createAsyncThunk(
  'weather/addNewCity',
  async (cityName, { getState, dispatch, rejectWithValue }) => {
    try {
      const geocodeResponse = await fetch(`/api/geocode?city=${encodeURIComponent(cityName)}`)
      if (!geocodeResponse.ok) {
        const errorData = await geocodeResponse.json()
        throw new Error(errorData.error || 'Failed to geocode city')
      }
      const geocodeData = await geocodeResponse.json()

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
        return { success: true, city: newCity }
      }
      
      dispatch(addCity(newCity))

      const weatherResponse = await fetch(`/api/weather?lat=${newCity.latitude}&lon=${newCity.longitude}&type=daily`)
      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json()
        throw new Error(errorData.error || 'Failed to fetch weather data')
      }

      const weatherData = await weatherResponse.json()
      dispatch(updateWeatherData({ cityId: newCity.id, data: weatherData }))
      console.log(weatherData)

      return { success: true, city: newCity }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
)

export const refreshAllWeatherData = createAsyncThunk(
  'weather/refreshAllWeatherData',
  async (_, { getState, dispatch }) => {
    const state = getState()
    const cities = state.weather.cities
    
    if (cities.length === 0) return

    dispatch(setRefreshing(true))
    
    try {
      const promises = cities.map(async (city) => {
        try {
          const url = `/api/weather?lat=${city.latitude}&lon=${city.longitude}&type=daily`
          const weatherResponse = await fetch(url)

          if (!weatherResponse.ok) {
            const errorData = await weatherResponse.json()
            throw new Error(errorData.error || 'Failed to fetch weather data')
          }

          const weatherData = await weatherResponse.json()
          dispatch(updateWeatherData({ cityId: city.id, data: weatherData }))
        } catch (error) {
          console.error(`Weather fetch error for ${city.name}:`, error)
        }
      })

      await Promise.all(promises)
      dispatch(refreshHourlyWeatherData())
    } finally {
      dispatch(setRefreshing(false))
    }
  }
)

export const fetchHourlyWeatherData = createAsyncThunk(
  'weather/fetchHourlyWeatherData',
  async ({ latitude, longitude, date }, { dispatch }) => {
    try {
      const url = `/api/weather?lat=${latitude}&lon=${longitude}&type=hourly&date=${date}`
      const weatherResponse = await fetch(url)

      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json()
        throw new Error(errorData.error || 'Failed to fetch hourly weather data')
      }

      const weatherData = await weatherResponse.json()
      const key = `${latitude}-${longitude}-${date}`
      dispatch(updateHourlyWeatherData({ key, data: weatherData }))

      return { success: true, data: weatherData }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
)

export const refreshHourlyWeatherData = createAsyncThunk(
  'weather/refreshHourlyWeatherData',
  async (_, { getState, dispatch }) => {
    const state = getState()
    if (!state.day.dayDetailOpen || !state.day.payload) return

    const { latitude, longitude, date } = state.day.payload
    await dispatch(fetchHourlyWeatherData({ latitude, longitude, date }))
  }
)

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.cities.push(action.payload);
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
      delete state.weatherData[action.payload];
    },
    updateWeatherData: (state, action) => {
      const { cityId, data } = action.payload;
      state.weatherData[cityId] = data;
    },
    updateHourlyWeatherData: (state, action) => {
      const { key, data } = action.payload;
      state.hourlyWeatherData[key] = data;
    },
    setRefreshing: (state, action) => {
      state.refreshing = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewCity.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.success) {
          state.error = action.payload.error;
        }
      })
      .addCase(addNewCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(refreshAllWeatherData.pending, (state) => {
        state.refreshing = true;
      })
      .addCase(refreshAllWeatherData.fulfilled, (state) => {
        state.refreshing = false;
      })
      .addCase(refreshAllWeatherData.rejected, (state) => {
        state.refreshing = false;
      });
  }
});

export const { addCity, removeCity, updateWeatherData, updateHourlyWeatherData, setRefreshing, setLoading, setError } = weatherSlice.actions
export default weatherSlice.reducer

export const selectWeatherForCity = (state, cityId) => state.weather.weatherData[cityId]
export const selectHourlyWeatherForLocation = (state, latitude, longitude, date) => {
  const key = `${latitude}-${longitude}-${date}`
  return state.weather.hourlyWeatherData[key]
}