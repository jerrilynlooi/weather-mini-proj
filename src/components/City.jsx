"use client"

import React from 'react';
import { openDayDetail } from '@/redux/actions/dayActions';
import { selectWeatherForCity } from '@/utils/selectors/';
import CloseIcon from '@mui/icons-material/Close';
import { LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherInfo } from '@/utils/weather'
import { removeCity } from '@/redux/actions/weatherActions';

const City = ({ city }) => {
	const dispatch = useDispatch()
	const data = useSelector(state => selectWeatherForCity(state, city.id))
	const dayPayload = useSelector(state => state.day.payload)
	const loading = !data
	const error = data?.error || ''

  return (
    <div key={city.id} className='card gap-4 w-full h-fit flex flex-col bg-[#dadada] fade-in'>
			{/* Header */}
			<div className='flex flex-row justify-between w-full items-center p-1'>
				<p className='text-xl'><strong>{city.name}</strong>, {city.country}</p>
				<CloseIcon className='border-1 hover:text-[#f1f1f1] hover:bg-[#3c3c3c] transition rounded-[8px] p-1' onClick={() => dispatch(removeCity(city.id))}/>
			</div>

			{/* Body */}

			{loading && <div className='fade-in w-full rounded-full text-[#aaaaaa] p-1'><LinearProgress color="inherit"/></div>}

			{error && <p className='text-red-800 p-1'>{error}</p>}

			{(!loading && data) && 
				<div className='fade-in flex flex-row justify-between w-full min-h-[10px] h-full items-center overflow-scroll scrollbar-hide gap-2 p-1'>
					{data.time.map((date, index) => {
						const weatherInfo = getWeatherInfo(data.weather_code[index]);

						return (
							<div key={index} className={`flex flex-col items-center inner-card w-full h-[100%] bg-[#f1f1f1] hover:bg-[#fafafa] transition min-w-[90px]
								${(dayPayload?.id === city.id && dayPayload?.date == date) ? 'ring-2 ' : 'ring-0'}`} // && dayPayload?.date == date
								style={{
									background: `linear-gradient(to top, 
										#dbedf3 0%, 
										#dbedf3 ${data.precipitation_probability_max[index]}%, 
										#f1f1f1 ${data.precipitation_probability_max[index]}%, 
										#f1f1f1 100%)`
								}}
								onClick={() => {
									const payload = { ...city, date: date };
									dispatch(openDayDetail(payload));
								}}
							>
								<p className='font-light text-2xl mb-1'>{weatherInfo.icon}</p>
								<p className='font-light text-2xl'>{Math.round(data.temperature_2m_max[index])}°</p>
								<p className='font-light text-md'>{Math.round(data.temperature_2m_min[index])}°</p>
								<p className='font-semibold text-sm mt-2'>{new Date(date).toLocaleDateString('en-GB', { weekday: 'short' })}</p>
								<p className='font-semibold text-sm'>{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
							</div>
						)
					})}
				</div>
			}

    </div>
  )
}

export default City
