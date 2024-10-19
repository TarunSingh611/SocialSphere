// Base Imports
import React from 'react'

const Loader = () => {
  return (
    <div
      className={`${
         'overlay-panel'
      }`}
    >
      <div className="fixed top-0 right-0 z-50 flex items-center justify-center w-screen h-screen bg-gray-950/60 ">
        <div className="m-auto">
              <div className="w-32 h-32 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
