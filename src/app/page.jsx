"use client"

import CityGrid from "@/components/CityGrid";
import Clock from "@/components/Clock";
import DayDetail from "@/components/DayDetail";
import Search from "@/components/Search";
import { refreshAllWeatherData } from "@/redux/actions/weatherActions";
import { useDispatch, useSelector } from "react-redux";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const cities = useSelector(state => state.weather.cities)
  const refreshing = useSelector(state => state.weather.refreshing);
  const dayDetailOpen = useSelector(state => state.day.dayDetailOpen);

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
    <div className="h-full w-full flex flex-col items-center py-10 fade-in">

      {/* Header */}
      <div className="flex flex-col flex-1 gap-3 m-10 items-center h-fit">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold">Weather</h1>
          <Clock/>
        </div>
        <Search/>
        <button 
          onClick={() => dispatch(refreshAllWeatherData())}
          disabled={refreshing}
          className={`rounded-[16px] py-1 pl-2 pr-3 flex flex-row items-center transition text-xs bg-[#dadada] ${ refreshing ? 'text-[#aaaaaa]' : 'hover:bg-[#aaaaaa]' }`}
        >
          <RefreshIcon className="pe-1"/> Refresh
        </button>
      </div>

      {/* Data */}
      <div className="w-full min-h-full h-fit px-2 sm:px-4 md:px-8 flex flex-col lg:flex-row gap-2 sm:gap-4">
        {dayDetailOpen && <DayDetail/>}
        <CityGrid/>
      </div>

    </div>
  );
}
