const SquareButton = ({label, iconURL, backgroundColor, textColor, borderColor, fullWidth, onClick}) => {
    return (
      <button
        className={`flex justify-center items-center 
        gap-2 px-7 py-4 border font-montserrat 
        text-lg leading-none h-10
        ${
          backgroundColor
            ? `${backgroundColor} ${textColor} ${borderColor}`
            : "bg-coral-red text-white border-coral-red"
        } rounded-md w-22`}
        onClick={onClick}
      >
          {label}
         {iconURL && <img src={iconURL} alt="Arrow Right icon" 
          className="ml-2 rounded-full w-5 h-5" />}
      </button>
    )
  }
  
  export default SquareButton