import React from 'react'
import MainTemp from './MainTemp'
import SavedLocs from './SavedLocs'

const Sidebar = () => {
  return (
    <div className='w-full sm:w-1/5 flex sm:flex-col gap-2'>
        <MainTemp/>
        <SavedLocs/>
    </div>
  )
}

export default Sidebar