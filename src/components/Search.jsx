"use client"

import { addCity } from '@/redux/slices/weatherSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Search = () => {
	const [city, setCity] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()

	async function searchCity(cityName) {
		setError('');
		setLoading(true);

		try {
			const geocodeResponse = await fetch(`/api/geocode?city=${encodeURIComponent(cityName)}`);
			if (!geocodeResponse.ok) {
				const errorData = await geocodeResponse.json();
				throw new Error(errorData.error || 'Failed to geocode city');
			}
			const geocodeData = await geocodeResponse.json();

			dispatch(addCity({
				id: geocodeData.id,
				name: geocodeData.name,
				country: geocodeData.country,
				latitude: geocodeData.latitude,
				longitude: geocodeData.longitude,
			}))

			setCity('');
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}

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
			{error && <p className='text-red-800'>{error}</p>}
		</div>
  )
}

export default Search