import Button from "../Components/Button"

const SuperQuality = () => {
  return (
    <section id="about-us"
    className="flex justify-between items-center 
    max-lg:flex-col gap-10
    w-full max-container"
    >
      <div className="flex flex-1 flex-col">
      <h2 className='font-palanquin capitalize text-4xl lg:max-w-lg font-bold'>
          We Provide You
          <span className='text-coral-red'> Super </span>
          <span className='text-coral-red'>Quality </span> Shoes
        </h2>
        <p className="mt-4 lg:max-w-lg info-text"></p>
      <Button label='View Details'
      />
      </div>

    </section>
  )
}

export default SuperQuality