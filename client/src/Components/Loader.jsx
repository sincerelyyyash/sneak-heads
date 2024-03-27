import React from 'react'

const Loader = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-loader-item" style={{ width: '100%', height: '20px', marginBottom: '10px' }}></div>
      <div className="skeleton-loader-item" style={{ width: '80%', height: '20px', marginBottom: '10px' }}></div>
      <div className="skeleton-loader-item" style={{ width: '60%', height: '20px', marginBottom: '10px' }}></div>
      <div className="skeleton-loader-item" style={{ width: '90%', height: '20px', marginBottom: '10px' }}></div>
      <div className="skeleton-loader-item" style={{ width: '70%', height: '20px', marginBottom: '10px' }}></div>
    </div>
  );

}

export default Loader