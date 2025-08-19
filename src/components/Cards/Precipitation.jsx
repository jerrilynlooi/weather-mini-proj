import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const Precipitation = ({ data }) => {

	const chartData = data ? data.time
		.map((time, index) => {
			const now = new Date();
			const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000));
			return new Date(time) >= oneHourAgo ? {
				time: new Date(time).toLocaleTimeString('en-US', {
					hour: 'numeric',
					hour12: true,
				}).toLowerCase().replace(' ', ''),
				precipitation: data.precipitation_probability[index],
				temperature: Math.round(data.temperature_2m[index])
			} : null;
		})
		.filter(Boolean) : [];

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
					<p className="font-semibold">{label}</p>
					<p className="font-light">{`${payload[0].value}%💧`}</p>
				</div>
			);
		}
		return null;
	};

  return (
    <div className='fade-in w-full max-w-full inner-card bg-[#f1f1f1]'>
			<h3 className='text-md font-semibold mb-3 px-1'>Precipitation</h3>
			<ResponsiveContainer width="100%" height={200}>
				<AreaChart data={chartData}>
					<CartesianGrid strokeDasharray="3 3" stroke="#dadada" />
					<XAxis 
						dataKey="time" 
						tick={{ fontSize: 10 }}
						stroke="#3c3c3c"
					/>
					<YAxis 
						domain={[0, 100]}
						tick={{ fontSize: 10 }}
						stroke="#3c3c3c"
						label={{ value: '%', position: 'insideLeft' }}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Area
						type="monotone"
						dataKey="precipitation"
						stroke="#22aaeE"
						fill="rgba(34, 170, 238, 0.2)"
						strokeWidth={1}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
  )
}

export default Precipitation