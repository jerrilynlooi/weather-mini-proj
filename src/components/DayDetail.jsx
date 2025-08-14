"use client"

import { closeDayDetail } from '@/redux/slices/daySlice'
import { fetchHourlyWeatherData, selectHourlyWeatherForLocation } from '@/redux/slices/weatherSlice'
import { LinearProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DayDetail = () => {
	const dispatch = useDispatch()
	const open = useSelector(state => state.day.dayDetailOpen)
	const payload = useSelector(state => state.day.payload)
	
	// Get hourly weather data from Redux store
	const data = useSelector(state => {
		if (!payload) return null
		return selectHourlyWeatherForLocation(state, payload.latitude, payload.longitude, payload.date)
	})
	
	// Determine loading and error states
	const loading = !data
	const error = data?.error || ''

	useEffect(() => {
		if (!open || !payload) return;

		// Fetch hourly weather data when day detail opens
		dispatch(fetchHourlyWeatherData({
			latitude: payload.latitude,
			longitude: payload.longitude,
			date: payload.date
		}))
	}, [open, payload, dispatch]);

	if (!payload) return null;

  return (
		<div className='w-full lg:w-1/2 flex flex-col lg:flex-1 card z-20 outline-0 bg-[#dadada] gap-4'>
			
			{/* Header */}
			<div className='flex flex-col w-full'>
				<div className='flex flex-row justify-between w-full items-center'>
					<p className='text-xl'><strong>{payload.name}</strong>, {payload.country}</p>
					<CloseIcon className='border-1 hover:text-[#f1f1f1] hover:bg-[#3c3c3c] transition rounded-[8px] p-1' onClick={() => dispatch(closeDayDetail())}/>
				</div>
				<p className='w-full'>
					<span className='font-semibold'>{new Date(payload.date).toLocaleDateString('en-GB', { weekday: 'long' })}</span> {new Date(payload.date).toLocaleDateString('en-GB', {day: 'numeric', month: 'long'})}
				</p>
			</div>

			{/* Body */}

			{loading && <div className='w-full rounded-full text-[#aaaaaa]'><LinearProgress color="inherit"/></div>}

			{error && <p className='text-red-800'>{error}</p>}

			{(!loading && data) && <div className='flex flex-row justify-between w-full items-center overflow-scroll scrollbar-hide gap-4 pb-3'>
				{data.time.map((time, index) => {
					return (
						<div key={index} className='flex flex-col items-center min-w-[36px] max-w-[36px] h-full border-b-1'>
							<p className='font-light text-lg'>{Math.round(data.temperature_2m[index])}°</p>
							<p className='font-semibold text-sm mt-2'>
								{new Date(time).toLocaleTimeString('en-US', {
									hour: 'numeric',
									hour12: true,
								}).toLowerCase().replace(' ', '')}
							</p>
						</div>
					)
				})}
			</div>}

		</div>
  )
}

export default DayDetail