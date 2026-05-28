import React from 'react'
import MainTemp from './MainTemp'
import SavedLocs from './SavedLocs'

const Sidebar = () => {
  return (
    <div className='sm:w-1/5 mt-3.5 xxs:flex sm:flex-col gap-2'>
        <MainTemp/>
        <SavedLocs/>
    </div>
  )
}

export default Sidebar