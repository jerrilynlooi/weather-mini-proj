"use client"

import React from 'react'
import City from './City'
import { useSelector } from 'react-redux'

const CityGrid = () => {
	const cities = useSelector(state => state.weather.cities)
  return (
    <div className={`grid grid-cols-1 ${cities.length>1 ? "lg:grid-cols-2" : ""} gap-2 sm:gap-4`}>
			{cities.map(city => {
				return <City key={city.id} city={city}/>
			})}
    </div>
  )
}

export default CityGrid