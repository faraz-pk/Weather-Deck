import React from 'react'
import SavedCity from './SavedCity'
import { useSelector } from 'react-redux';

const SavedLocs = () => {
   const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={`card w-full rounded-xl p-2.5 grow ${
          theme === "dark" ? "dark-gradient" : "white-bg"
        }`}>
        <div className='font-bold ml-1'>Saved Locations</div>
        <div className='scroll-bar pr-2 h-69'>
          <SavedCity city = 'Karachi' temp = '34°C'/>
          <SavedCity city = 'Multan' temp = '42°C'/>
          <SavedCity city = 'Islamabad' temp = '26°C'/>
          <SavedCity city = 'Lahore' temp = '32°C'/>
          <SavedCity city = 'Lahore' temp = '32°C'/>
          <SavedCity city = 'Lahore' temp = '32°C'/>
          <SavedCity city = 'Lahore' temp = '32°C'/>
        </div>
    </div>
  )
}

export default SavedLocs