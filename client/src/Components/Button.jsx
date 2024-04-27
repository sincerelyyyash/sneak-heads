import React from 'react';

const Button = ({ label, iconURL, backgroundColor, textColor, borderColor, fullWidth, onClick, square }) => {
  const roundedStyle = square ? 'rounded-lg' : 'rounded-full'; 

  return (
    <button
      className={`before:ease relative h-12 w-40 overflow-hidden 
      border-coral-red shadow-2xl before:absolute before:left-0 before:-ml-2 
      before:h-48 before:w-48 before:origin-top-right before:-translate-x-full 
      before:translate-y-12 before:-rotate-90 before:bg-white before:transition-all 
      before:duration-300 hover:text-white hover:shadow-white hover:before:-rotate-180 flex 
      justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none ${
        backgroundColor
          ? `${backgroundColor} ${textColor} ${borderColor}`
          : "bg-white text-coral-red border-coral-red"
      } ${roundedStyle} ${fullWidth && 'w-full'} hover:bg-coral-red hover:text-white`}
      onClick={onClick}
    >
      <span className="relative z-10">{label}</span>
      {iconURL && <img src={iconURL} alt="Arrow Right icon" className="ml-2 rounded-full w-5 h-5" />}
    </button>
  );
};

export default Button;
