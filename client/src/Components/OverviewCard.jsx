import React from 'react';
import {HiTrendingUp, HiTrendingDown} from 'react-icons/hi'

function OverviewCard({ title,amount, value, percentage }) {
  return (
      <div className='mt-5 px-5 bg-white w-72 h-28 rounded-lg shadow-3xl 
      flex items-center justify-between'>
        <div className='p-4'>
          <h4 className='text-black text-lg italic'>{title}</h4>
          <h1 className='text-coral-red text-2xl  font-bold '>{amount ? `$${value}` :value }</h1>
        </div>
        <div className='relative mr-4'>
          <div className='absolute top-1/2 left-full transform -translate-y-1/2 
          -translate-x-full 
          w-16 h-16 flex justify-center items-center rounded-full 
          border-4 border-green-400 '>
          {
            percentage>0? (<span className='text-green'><HiTrendingUp/> +{percentage}%{" "} </span>)
            :(<span className='text-red'><HiTrendingDown/> {percentage}%{" "} </span>)
          }
               </div>
        </div>
      </div>
  );
}

export default OverviewCard;
