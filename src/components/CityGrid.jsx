"use client"

import React from 'react'
import City from './City'
import { useSelector } from 'react-redux'

const CityGrid = () => {
	const cities = useSelector(state => state.weather.cities);
	const dayDetailOpen = useSelector(state => state.day.dayDetailOpen);
  return (
    <div className={`${dayDetailOpen ? 'lg:flex-1':'w-full'} fade-in h-fit grid grid-cols-1 ${(cities.length>1 && !dayDetailOpen)? "lg:grid-cols-2" : ""} gap-2 sm:gap-4`}>
			{ 
				cities.length > 0
				? cities.map(city => { return <City key={city.id} city={city}/> })
				: (!dayDetailOpen && <div className='w-full h-full text-center text-[#aaaaaa] text-lg'>Search for a city to get started!</div>)
			}
    </div>
  )
}

export default CityGrid