import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const TempTrendGraph = () => {
  const theme = useSelector((state) => state.theme.mode);
  const { data } = useSelector((state) => state.weather);
  if (!data) return null;

  const currentTime = data?.location.localtime;
  const currentHour = new Date(currentTime).getHours();
  const todayHours = data?.forecast.forecastday[0].hour;
  const tomorrowHours = data?.forecast.forecastday[1].hour;
  const remainingToday = todayHours.slice(currentHour + 1);
  const next12Hours = [...remainingToday, ...tomorrowHours].slice(0, 12);

  const rawData = [
    { time: (next12Hours[0].time).split(" ")[1], temp: next12Hours[0].temp_c },
    { time: (next12Hours[1].time).split(" ")[1], temp: next12Hours[1].temp_c },
    { time: (next12Hours[2].time).split(" ")[1], temp: next12Hours[2].temp_c },
    { time: (next12Hours[3].time).split(" ")[1], temp: next12Hours[3].temp_c },
    { time: (next12Hours[4].time).split(" ")[1], temp: next12Hours[4].temp_c },
    { time: (next12Hours[5].time).split(" ")[1], temp: next12Hours[5].temp_c },
    { time: (next12Hours[6].time).split(" ")[1], temp: next12Hours[6].temp_c },
    { time: (next12Hours[7].time).split(" ")[1], temp: next12Hours[7].temp_c },
    { time: (next12Hours[8].time).split(" ")[1], temp: next12Hours[8].temp_c },
    { time: (next12Hours[9].time).split(" ")[1], temp: next12Hours[9].temp_c },
    { time: (next12Hours[10].time).split(" ")[1], temp: next12Hours[10].temp_c },
    { time: (next12Hours[11].time).split(" ")[1], temp: next12Hours[11].temp_c },
  ];

  return (
    <div className={`mt-2 card w-full rounded-2xl py-2.5 px-3.75 ${
          theme === "dark" ? "dark-gradient" : "white-bg"
        }`}>
      <p className="text-sm font-medium mb-2.5">
        Temperature Trend (Next 12 Hours)
      </p>
      <div className="h-25 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={rawData}>
            <defs>
              {/* This creates the blue fade effect */}
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines only */}
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              domain={["dataMin - 2", "auto"]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              itemStyle={{ color: "#0ea5e9" }}
            />

            <Area
              type="monotone"
              dataKey="temp"
              stroke="#0ea5e9"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTemp)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TempTrendGraph;
