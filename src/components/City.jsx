"use client"

import { openDayDetail } from '@/redux/slices/daySlice';
import { removeCity, selectWeatherForCity } from '@/redux/slices/weatherSlice';
import CloseIcon from '@mui/icons-material/Close';
import { LinearProgress } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const City = ({ city }) => {
	const dispatch = useDispatch()
	const data = useSelector(state => selectWeatherForCity(state, city.id))
	const loading = !data
	const error = data?.error || ''

  return (
    <div key={city.id} className='card gap-4 w-full h-fit flex flex-col bg-[#dadada]'>
			{/* Header */}
			<div className='flex flex-row justify-between w-full items-center'>
				<p className='text-xl'><strong>{city.name}</strong>, {city.country}</p>
				<CloseIcon className='border-1 hover:text-[#f1f1f1] hover:bg-[#3c3c3c] transition rounded-[8px] p-1' onClick={() => dispatch(removeCity(city.id))}/>
			</div>

			{/* Body */}

			{loading && <div className='w-full rounded-full text-[#aaaaaa]'><LinearProgress color="inherit"/></div>}

			{error && <p className='text-red-800'>{error}</p>}

			{(!loading && data) && <div className='flex flex-row justify-between w-full min-h-[10px] items-center overflow-scroll scrollbar-hide gap-2'>
				{data.time.map((date, index) => {
					return (
						<div key={index} className='flex flex-col items-center w-full h-full bg-[#f1f1f1] inner-card hover:bg-[#fafafa] transition min-w-[90px]'
							onClick={() => {
								const payload = { ...city, date: date };
								dispatch(openDayDetail(payload));
							}}
						>
							<p className='font-light text-2xl'>{Math.round(data.temperature_2m_max[index])}°</p>
							<p className='font-light text-md'>{Math.round(data.temperature_2m_min[index])}°</p>
							<p className='font-semibold text-sm mt-2'>
								{new Date(date).toLocaleDateString('en-GB', {
									weekday: 'short'
								})}
							</p>
							<p className='font-semibold text-sm'>
								{new Date(date).toLocaleDateString('en-GB', {
									day: 'numeric',
									month: 'short'
								})}
							</p>
						</div>
					)
				})}
			</div>}

    </div>
  )
}

export default City
