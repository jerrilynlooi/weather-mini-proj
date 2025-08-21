import React from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const WindSpeed = ({ data }) => {

	const chartData = data ? data.time
		.map((time, index) => {
			const now = new Date();
			const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000));
			return new Date(time) >= oneHourAgo ? {
				time: new Date(time).toLocaleTimeString('en-US', {
					hour: 'numeric',
					hour12: true,
				}).toLowerCase().replace(' ', ''),
				windspeed: Math.round(data.wind_speed_10m[index])
			} : null;
		})
		.filter(Boolean) : [];

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-[#f1f1f1] p-3 border border-gray-300 rounded-lg shadow-lg">
					<p className="font-semibold">{label}</p>
					<p className="font-light">{`${payload[0].value}km/h💨`}</p>
				</div>
			);
		}
		return null;
	};

  return (
    <div className='fade-in inner-card'>
			<h3 className='text-md font-semibold mb-3 px-1'>Wind Speed <span className='font-normal text-[#aaaaaa]'><i>km/h</i></span></h3>
			<ResponsiveContainer width="100%" height={200}>
				<AreaChart data={chartData}>
					<CartesianGrid strokeDasharray="3 3" stroke="#aaaaaa" />
					<XAxis 
						dataKey="time" 
						tick={{ fontSize: 10 }}
						stroke="#3c3c3c"
					/>
					<YAxis 
						domain={[0, 40]}
						tick={{ fontSize: 10 }}
						stroke="#3c3c3c"
						label={{ value: 'km/h', position: 'insideLeft',
							style: { fontSize: '12px'}
						}}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Area
						type="monotone"
						dataKey="windspeed"
						stroke="#9051e8"
						fill="rgba(144, 81, 232, 0.2)"
						strokeWidth={1}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
  )
}

export default WindSpeed;
