"use client"

import { openDayModal } from '@/redux/slices/modalSlice';
import { removeCity } from '@/redux/slices/weatherSlice';
import CloseIcon from '@mui/icons-material/Close';
import { LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const City = ({ city }) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const dispatch = useDispatch()

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError('');
				const url = `/api/weather?lat=${city.latitude}&lon=${city.longitude}&type=daily`
				const weatherResponse = await fetch(url);

				if (!weatherResponse.ok) {
					const errorData = await weatherResponse.json();
					throw new Error(errorData.error || 'Failed to fetch weather data');
				}

				const weatherData = await weatherResponse.json();
				setData(weatherData);
			} catch (error) {
				console.error('Weather fetch error:', error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData()
	}, []);

  return (
    <div key={city.id} className='card gap-4 w-full flex flex-col bg-[#dadada]'>
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
								dispatch(openDayModal(payload));
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
