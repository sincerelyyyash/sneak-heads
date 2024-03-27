import React from 'react'
import notFoundImage from '../Constants';

function ProductNotfound() {
  return (
    <div className='flex justify-center items-center'>
        <img src={notFoundImage} alt="" />
    </div>
  )
}

export default ProductNotfound