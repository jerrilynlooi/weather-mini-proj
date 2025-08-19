"use client"

import { closeDayDetail } from '@/redux/slices/daySlice'
import { fetchHourlyWeatherData, selectHourlyWeatherForLocation } from '@/redux/slices/weatherSlice'
import { LinearProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeatherInfo } from '@/utils/weather';

const DayDetail = () => {
	const dispatch = useDispatch()
	const open = useSelector(state => state.day.dayDetailOpen)
	const payload = useSelector(state => state.day.payload)
	
	const data = useSelector(state => {
		if (!payload) return null
		return selectHourlyWeatherForLocation(state, payload.latitude, payload.longitude, payload.date)
	})
	
	const loading = !data
	const error = data?.error || ''

	useEffect(() => {
		if (!open || !payload) return;
		dispatch(fetchHourlyWeatherData({
			latitude: payload.latitude,
			longitude: payload.longitude,
			date: payload.date
		}))
	}, [open, payload, dispatch]);

	if (!payload) return null;

  return (
		<div className='w-full lg:w-1/2 flex flex-col lg:flex-1 card z-20 outline-0 bg-[#dadada] gap-4 fade-in'>
			
			{/* Header */}
			<div className='flex flex-col w-full p-1'>
				<div className='flex flex-row justify-between w-full items-center'>
					<p className='text-xl'><strong>{payload.name}</strong>, {payload.country}</p>
					<CloseIcon className='border-1 hover:text-[#f1f1f1] hover:bg-[#3c3c3c] transition rounded-[8px] p-1' onClick={() => dispatch(closeDayDetail())}/>
				</div>
				<p className='w-full'>
					<span className='font-semibold'>{new Date(payload.date).toLocaleDateString('en-GB', { weekday: 'long' })}</span> {new Date(payload.date).toLocaleDateString('en-GB', {day: 'numeric', month: 'long'})}
				</p>
			</div>

			{/* Body */}

			{loading && <div className='fade-in w-full rounded-full text-[#aaaaaa] p-1'><LinearProgress color="inherit"/></div>}

			{error && <p className='text-red-800 p-1'>{error}</p>}

			{(!loading && data) && <div className='fade-in flex flex-row justify-between w-full items-center overflow-scroll scrollbar-hide gap-2 px-1 pb-3'>
				{data.time
					.map((time, index) => ({ time, index })) 
					.filter(({ time }) => { // Filter out past hours
						const now = new Date();
						const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000));
						return new Date(time) >= oneHourAgo;
					}) 
					.map(({ time, index }) => {
						const weatherInfo = getWeatherInfo(data.weather_code[index]);

						return (
							<div key={index} className='flex flex-col items-center min-w-[49px] max-w-[49px] h-full'>
								<p className='text-lg mb-1'>{weatherInfo.icon}</p>
								<p className='text-lg'>{Math.round(data.temperature_2m[index])}°</p>
								<p className='font-semibold text-sm mt-2 border-b-1 w-full text-center'>
									{new Date(time).toLocaleTimeString('en-US', {
										hour: 'numeric',
										hour12: true,
									}).toLowerCase().replace(' ', '')}
								</p>
								{(!data.precipitation_probability.every(val => val === 0)) && <p className='font-light text-sm mt-3'>{data.precipitation_probability[index]>0 ? data.precipitation_probability[index]+'%💧' : '.'}</p>}
							</div>
						)
				})}
			</div>}

		</div>
  )
}

export default DayDetail