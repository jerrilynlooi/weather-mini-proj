"use client"

import React, { useState, useEffect } from 'react'

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

	const formattedTime = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="text-lg fade-in">
      <p>{formattedTime}</p>
    </div>
  );
}

export default Clock