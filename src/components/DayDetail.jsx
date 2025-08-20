"use client"

import { closeDayDetail } from '@/redux/actions/dayActions'
import { fetchHourlyWeatherData } from '@/redux/actions/weatherActions'
import { selectHourlyWeatherForLocation, selectWeatherForCity } from '@/utils/selectors'
import { LinearProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeatherInfo } from '@/utils/weather';
import Precipitation from './Cards/Precipitation';
import WindSpeed from './Cards/WindSpeed';

const DayDetail = () => {
	const dispatch = useDispatch()
	const open = useSelector(state => state.day.dayDetailOpen)
	const payload = useSelector(state => state.day.payload)

	const dayData = useSelector(state => selectWeatherForCity(state, payload.id))
	const data = useSelector(state => { // hourly data
		if (!payload) return null;
		return selectHourlyWeatherForLocation(state, payload.latitude, payload.longitude, payload.date);
	})
	
	const loading = !data;
	const error = data?.error || '';
	const rain = !data?.precipitation_probability.every(val => val === 0);

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
		<div className='w-full lg:w-1/2 flex flex-col lg:flex-1 card z-20 outline-0 bg-[#dadada] gap-4 fade-in h-fit'>
			
			{/* Header */}
			<div className='flex flex-col w-full p-1'>
				<div className='flex flex-row justify-between w-full items-center'>
					<p className='text-xl'><strong>{payload.name}</strong>, {payload.country}</p>
					<CloseIcon className='border-1 hover:bg-[#aaaaaa] transition-all rounded-[8px] p-1' onClick={() => dispatch(closeDayDetail())}/>
				</div>
				<p className='w-full'>
					<span className='font-semibold'>{new Date(payload.date).toLocaleDateString('en-GB', { weekday: 'long' })}</span> {new Date(payload.date).toLocaleDateString('en-GB', {day: 'numeric', month: 'long'})}
				</p>
			</div>

			{/* Body */}

			{loading && <div className='fade-in w-full rounded-full text-[#aaaaaa] p-1'><LinearProgress color="inherit"/></div>}

			{error && <p className='text-red-800 p-1'>{error}</p>}

			{(!loading && data) 
			&& 
			<>
				{/* Main Content */}
				<div className='fade-in flex flex-row justify-between w-full items-center overflow-scroll scrollbar-hide gap-2 px-1 pb-1'>
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
									<p className='font-semibold text-sm mt-1 border-b-1 w-full text-center'>
										{new Date(time).toLocaleTimeString('en-US', {
											hour: 'numeric',
											hour12: true,
										}).toLowerCase().replace(' ', '')}
									</p>
									{rain && <p className='font-light text-sm mt-3'>{data.precipitation_probability[index]>0 ? data.precipitation_probability[index]+'%💧' : '.'}</p>}
								</div>
							)
					})}
				</div>

				{/* Cards */}
				<div className='flex flex-col p-1 gap-2'>
					{rain ? <Precipitation data={data}/> : <p className='text-[#888888] mb-3'><i>No chance of Precipitation💧</i></p>}
					<WindSpeed data={data}/>
					
					<div className='fade-in inner-card'>
						<div className='flex flex-row w-full h-full items-center justify-center px-1'>
							
							<div className='flex flex-row h-fit flex-1 gap-4'>
								<div className='flex flex-col w-fit'>
									<h3 className='text-md font-semibold'>Max. UV Index ☀️</h3>
									<h3 className='text-md font-semibold'>Min. Visibility 🌫️</h3>
								</div>
								<div className='flex flex-col flex-1'>
									<h3 className='text-md'>{dayData.uv_index_max[payload.index]}</h3>
									<h3 className='text-md'>{Math.round(dayData.visibility_min[payload.index]/1000)} km</h3>
								</div>
							</div>

							<div className='flex flex-row h-fit flex-1 gap-4'>
								<div className='flex flex-col w-fit'>
									<h3 className='text-md font-semibold'>Sunrise 🌇</h3>
									<h3 className='text-md font-semibold'>Sunset 🌃</h3>
								</div>
								<div className='flex flex-col flex-1'>
									<h3 className='text-md'>{new Date(dayData.sunrise[payload.index]).toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true, })}</h3>
									<h3 className='text-md'>{new Date(dayData.sunset[payload.index]).toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true, })}</h3>
								</div>
							</div>

						</div>
					</div>

				</div>
			</>
			}
			
		</div>
  )
}

export default DayDetail