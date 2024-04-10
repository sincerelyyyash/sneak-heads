import React from 'react';

const PopUpBox = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <p className="text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default PopUpBox;
