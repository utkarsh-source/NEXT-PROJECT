import React from 'react'
import ReactLoading from 'react-loading';

const FullPageLoader = () => (
  <div className="z-50 bg-gray-200 fixed top-0 left-0 bottom-0 right-0 w-screen h-screen flex items-center justify-center">
    <ReactLoading type="spin" color="teal" height={50} width={50} />
  </div>
)

export default FullPageLoader
