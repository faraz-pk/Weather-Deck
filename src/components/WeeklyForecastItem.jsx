import React from 'react'
import { useSelector } from 'react-redux';

const WeeklyForecastItem = (props) => {

  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={`sm:w-[33%] md:w-[20%] lg:w-[14.2%] px-2.5 py-1.25 flex flex-col gap-2 justify-center items-center grey-border-top grey-border-right`}>
          <span className="grey-text lg:text-xs xl:text-sm">{props.day}</span>
          <span><img className='w-8' src={props.icon} alt="icon" /></span>
          <span className="text-xs font-medium">{props.temp}</span>
          <div className='w-full h-1 grey-bg rounded-md overflow-hidden relative'>
            <div className='h-full bg-[#32BDF0] rounded-md' style={{width: props.chance+ "%"}}></div>
          </div>
        </div>
  )
}

export default WeeklyForecastItem