"use client"

import { addNewCity } from '@/redux/slices/weatherSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Search = () => {
	const [city, setCity] = useState('')
	const [localError, setLocalError] = useState('')
	
	const dispatch = useDispatch()
	const loading = useSelector(state => state.weather.loading)
	const error = useSelector(state => state.weather.error)

	async function searchCity(cityName) {
		setLocalError('');
		try {
			const result = await dispatch(addNewCity(cityName)).unwrap();
			if (result.success) {
				setCity('');
			} else {
				setLocalError(result.error);
			}
		} catch (error) {
			setLocalError(error.message);
		}
	}

	const displayError = localError || error;

  return (
		<div className='flex flex-col items-center gap-2'>
			<form className='w-full flex flex-row gap-2' 
				onSubmit={(e) => {
					e.preventDefault()
					searchCity(city)
				}}
			>
				<input 
					className='chip flex-1 focus:outline-[#aaaaaa]' placeholder='Enter a city...' value={city} 
					onChange={(e) => {setCity(e.target.value)}} required disabled={loading}
				/>
				<button 
					className='chip flex-2 bg-[#fafafa] hover:bg-[#dadada] disabled:bg-[#f1f1f1] disabled:text-[#dadada] transition' 
					type='submit' disabled={!city || loading}
				>
					Search
				</button>
			</form>
			{displayError && <p className='text-red-800'>{displayError}</p>}
		</div>
  )
}

export default Search