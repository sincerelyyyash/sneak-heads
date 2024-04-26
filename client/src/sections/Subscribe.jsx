import Button from "../Components/Button"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Subscribe = () => {
  const failureToast = (message) => {
    toast.error(message);
  };
  return (
    <section className="max-container flex justify-between
    items-center max-lg:flex-col gap-10"
    id="contact-us"
    >
      <h3 className="text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold">Sign Up from
        <span className="text-coral-red "> Updates </span>& Newsletter
      </h3>
      <div className="lg:max-w-[40%] w-full flex items-center max-sm:flex-col 
      gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full">
        <input type="text" placeholder="Subscribe@sneakheads.com" className="input" id="subscribeInput"/>
        <div className="flex max-sm:justify-end items-center max-sm:w-full">
          <Button label='Sign-up' onClick={()=>{
            failureToast("Could not subscribe")
          }} fullWidth/>
        </div>
      </div>
      <ToastContainer/>
    </section>
  )
}

export default Subscribe