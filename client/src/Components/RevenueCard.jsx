import React from 'react';

function RevenueCard({ title, value, percentage }) {
  return (
    <div className='mt-5 px-10'>
      <div className='bg-white w-56 h-28 rounded-lg shadow-3xl flex items-center justify-between'>
        <div className='p-4'>
          <h4 className='text-black text-lg'>{title}</h4>
          <h1 className='text-coral-red text-2xl  font-bold'>{value}</h1>
        </div>
        <div className='relative mr-4'>
          <div className='absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-full w-16 h-16 flex justify-center items-center rounded-full border-4 border-green-400 '>
            <h3 className='text-green-600 font-xl'>{percentage}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueCard;
