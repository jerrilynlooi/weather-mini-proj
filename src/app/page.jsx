"use client"

import CityGrid from "@/components/CityGrid";
import Clock from "@/components/Clock";
import DayDetail from "@/components/DayDetail";
import Search from "@/components/Search";
import { useSelector } from "react-redux";
import RefreshBtn from "@/components/RefreshBtn";

export default function Home() {
  const cities = useSelector(state => state.weather.cities)
  const dayDetailOpen = useSelector(state => state.day.dayDetailOpen);

  const noContent = (cities.length === 0) && !dayDetailOpen;

  return (
    <div className={`h-full w-full flex flex-col items-center justify-center py-10 fade-in ${ noContent ? 'h-screen' : '' }`}>

      {/* Header */}
      <div className="flex flex-col flex-1 gap-3 m-10 items-center h-fit">
        <div className="flex flex-col items-center gap-2">
          <p className="text-4xl font-bold">Weather</p>
          <div className="flex flex-row w-fit items-center gap-1">
            <a href="/calendar" className='hover:bg-[#dadada] transition-all rounded-lg p-1'>🗓️</a>
            <Clock/>
          </div>
        </div>
        <Search/>
        {!noContent && <RefreshBtn/>}
      </div>

      {/* Data */}
      {!noContent && 
        <div className="w-full min-h-full h-fit px-2 sm:px-4 md:px-8 flex flex-col lg:flex-row gap-2 sm:gap-4">
          {dayDetailOpen && <DayDetail/>}
          <CityGrid/>
        </div>
      }

    </div>
  );
}
