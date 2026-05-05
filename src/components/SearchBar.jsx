import React from 'react'
import { FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RxCrossCircled } from "react-icons/rx";

const SearchBar = () => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={`border-effect w-3/4 sm:w-1/2 flex items-center justify-center rounded-3xl ${
          theme === "dark" ? "dark-gradient grey-border" : "white-bg black-border"
        }`}>
        <span className='grey-text ml-5 cursor-pointer [&_svg]:hover:text-white transition-colors'><FaSearch/></span>
        <input placeholder='Search City' type="text" name="city" id="city" className='w-full py-1.75 px-3.75 outline-none border-none'/>
        <span className='grey-text text-lg mr-5 cursor-pointer [&_svg]:hover:text-white transition-colors'><RxCrossCircled/></span>
    </div>
  )
}

export default SearchBar