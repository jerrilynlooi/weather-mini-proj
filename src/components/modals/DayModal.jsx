"use client"

import { closeDayModal } from '@/redux/slices/modalSlice'
import { LinearProgress, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DayModal = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const dispatch = useDispatch()
	const open = useSelector(state => state.modal.dayModalOpen)
	const payload = useSelector(state => state.modal.payload)

	useEffect(() => {
		if (!open) return;

		const fetchData = async () => {
			try {
				setLoading(true);
				setError('');
				const url = `/api/weather?lat=${payload.latitude}&lon=${payload.longitude}&type=hourly&date=${payload.date}`
				const weatherResponse = await fetch(url);
		
				if (!weatherResponse.ok) {
					const errorData = await weatherResponse.json();
					throw new Error(errorData.error || 'Failed to fetch weather data');
				}

				const weatherData = await weatherResponse.json();
				console.log(weatherData)
				setData(weatherData);
			} catch (error) {
				console.error('Weather fetch error:', error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData()
	}, [open]);

	if (!payload) return null;

  return (
		<Modal open={open} onClose={() => dispatch(closeDayModal())} className='h-full w-full flex items-center justify-center outline-0 px-2 sm:px-4 md:px-8'>
			<div className='card z-20 outline-0 bg-[#dadada] w-full gap-4 flex flex-col max-w-5xl'>
				
				{/* Header */}
				<div className='flex flex-col w-full'>
					<div className='flex flex-row justify-between w-full items-center'>
						<p className='text-xl'><strong>{payload.name}</strong>, {payload.country}</p>
						<CloseIcon className='border-1 hover:text-[#f1f1f1] hover:bg-[#3c3c3c] transition rounded-[8px] p-1' onClick={() => dispatch(closeDayModal())}/>
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
		</Modal>
  )
}

export default DayModal