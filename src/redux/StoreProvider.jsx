"use client"

import React, { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './store'
import { refreshAllWeatherData, selectCities } from './slices/weatherSlice'

function WeatherTimer({ children }) {
  const dispatch = useDispatch()
  const cities = useSelector(selectCities)

  useEffect(() => {
    const interval = setInterval(() => {
      if (cities.length > 0) {
        dispatch(refreshAllWeatherData())
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [cities.length, dispatch])

  useEffect(() => {
    if (cities.length > 0) {
      dispatch(refreshAllWeatherData())
    }
  }, [])

  return children
}

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <WeatherTimer>
        {children}
      </WeatherTimer>
    </Provider>
  )
}
