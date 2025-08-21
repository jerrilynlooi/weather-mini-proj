"use client"

import Clock from '@/components/Clock'
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'
import React, { useState } from 'react'

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()


  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }
  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }

  const generateCalendarDays = () => {
    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: '', isEmpty: true })
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
      days.push({
        day,
        date,
        isToday,
        isSelected,
        isEmpty: false
      })
    }
    
    return days
  }

  const calendarDays = generateCalendarDays()
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="h-full w-full flex flex-col items-center justify-center py-10 fade-in">
      
      {/* Header */}
      <div className="flex flex-col flex-1 gap-3 m-10 items-center h-fit">
        <div className="flex flex-col items-center gap-2">
          <p className="text-4xl font-bold">Calendar</p>
          <div className="flex flex-row w-fit items-center gap-1">
            <a href="/" className='hover:bg-[#dadada] transition-all rounded-lg p-1'>☂️</a>
            <div onClick={goToToday} className='hover:text-[#888888] transition-all'><Clock/></div>
          </div>
        </div>
      </div>

      <div className={`card gap-4 w-fit h-fit flex flex-col bg-[#dadada] fade-in`}>

        <div className="flex flex-row items-center justify-between">
          <button onClick={goToPreviousMonth} className="p-2 hover:bg-[#f1f1f1] rounded-lg transition-colors"><ChevronLeftOutlined/></button>
          <div className="text-center mt-1">
            <h2 className="text-xl font-semibold">
              {monthNames[currentMonth]} {currentYear}
            </h2>
          </div>
          <button onClick={goToNextMonth} className="p-2 hover:bg-[#f1f1f1] rounded-lg transition-colors" ><ChevronRightOutlined/></button>
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayNames.map((day) => (
            <div key={day} className="text-center px-2 font-semibold text-sm">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 pb-2 border-b border-[#aaa]">
          {calendarDays.map((dayData, index) => (
            <div key={index}
              className={`aspect-square p-2 text-center cursor-pointer transition-all rounded-lg
                ${dayData.isEmpty ? 'bg-transparent' 
                  : dayData.isSelected ? 'bg-[#aaaaaa] text-[#3c3c3c]'
                  : 'hover:bg-[#f1f1f1] rounded-lg'} 
                ${dayData.isToday ? 'border-[#3c3c3c] font-bold outline-1' : ''}
              `}
              onClick={() => !dayData.isEmpty && setSelectedDate(dayData.date)}
            >
              {!dayData.isEmpty && (
                <span className="text-sm">
                  {dayData.day}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className='p-2'>
          <p className="text-[#3c3c3c]">
            <strong>{selectedDate.toLocaleDateString('en-GB', { weekday: 'long' })}</strong> {selectedDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

      </div>
    </div>
  )
}

    /*
          <div className={`h-full w-full flex flex-col items-center justify-center py-10 fade-in ${ noContent ? 'h-screen' : '' }`}>

      <div className="flex flex-col flex-1 gap-3 m-10 items-center h-fit">
        <div className="flex flex-col items-center gap-2">
          <p className="text-4xl font-bold">Weather</p>
          <Clock/>
        </div>
        <Search/>
        {!noContent && <RefreshBtn/>}
      </div>


      {!noContent && 
        <div className="w-full min-h-full h-fit px-2 sm:px-4 md:px-8 flex flex-col lg:flex-row gap-2 sm:gap-4">
          {dayDetailOpen && <DayDetail/>}
          <CityGrid/>
        </div>
      }

    </div>
      */