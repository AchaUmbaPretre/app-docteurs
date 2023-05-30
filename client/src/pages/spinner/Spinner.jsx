import './spinner.css'
/* import { useState, CSSProperties } from 'react'
import ClipLoader from 'react-spinners/ClipLoader' */

const Spinner = () => {
  
  return (
    <>
        <div className="spinner">
          <div className="progresse-bar">
            <div className="progresse"></div>
          </div>
          <span className='loading'>Telechargement</span>
        </div>

    </>
  )
}

export default Spinner