import React from 'react'
import { refreshAllWeatherData } from "@/redux/actions/weatherActions";
import { useDispatch, useSelector } from "react-redux";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect } from "react";

const RefreshBtn = () => {
  const dispatch = useDispatch();
  const cities = useSelector(state => state.weather.cities)
  const refreshing = useSelector(state => state.weather.refreshing);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cities.length > 0) {
        dispatch(refreshAllWeatherData())
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [cities.length, dispatch])

  useEffect(() => {
    if (cities.length > 0) {
      dispatch(refreshAllWeatherData())
    }
  }, [])

  return (
    <button 
			onClick={() => dispatch(refreshAllWeatherData())}
			disabled={refreshing}
			className={`rounded-[16px] py-1 pl-2 pr-3 flex flex-row items-center transition-all text-xs bg-[#dadada] ${ refreshing ? 'text-[#aaaaaa]' : 'hover:bg-[#aaaaaa]' }`}
		>
			<RefreshIcon className="pe-1"/> Refresh
		</button>
  )
}

export default RefreshBtn