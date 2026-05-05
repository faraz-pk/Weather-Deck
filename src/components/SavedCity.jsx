import React from 'react'
import { useSelector } from 'react-redux'

const SavedCity = (props) => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={`text-xs lg:text-sm font-bold rounded-lg px-3 py-2 my-1 flex justify-between ${
          theme === "dark" ? "dark-bg" : "light-bg"
        }`}>
        <span>{props.city}</span>
        <span>{props.temp}</span>
    </div>
  )
}

export default SavedCity