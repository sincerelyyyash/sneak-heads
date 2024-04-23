import React, { useEffect, useState } from 'react';

const Notification = ({ color, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isVisible && (
        <div className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white ${color}`}>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
