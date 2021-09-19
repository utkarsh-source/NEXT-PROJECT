import React from 'react'
import ReactLoading from 'react-loading';

const FullPageLoader = () => (
  <div className="bg-transparent fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
      <ReactLoading type="spinningBubbles" color="teal" height={50} width={50} />
  </div>
)

export default FullPageLoader
