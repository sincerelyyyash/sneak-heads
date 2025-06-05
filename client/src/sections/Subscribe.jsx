import Button from "../Components/Button"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion"

const Subscribe = () => {
  const failureToast = (message) => {
    toast.error(message);
  };

  const fadeIn = (direction, delay) => ({
    hidden: {
      y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
      opacity: 0,
      x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  });

  return (
    <motion.section 
      className="max-container flex justify-between items-center max-lg:flex-col gap-10"
      id="contact-us"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.h3 
        className="text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold"
        variants={fadeIn('right', 0.2)}
      >
        Sign Up from
        <span className="text-coral-red"> Updates </span>& Newsletter
      </motion.h3>
      <motion.div 
        className="lg:max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full"
        variants={fadeIn('left', 0.2)}
      >
        <motion.input 
          type="text" 
          placeholder="Subscribe@sneakheads.com" 
          className="input" 
          id="subscribeInput"
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        />
        <motion.div 
          className="flex max-sm:justify-end items-center max-sm:w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button 
            label='Sign-up' 
            onClick={()=>{
              failureToast("Could not subscribe")
            }} 
            fullWidth
          />
        </motion.div>
      </motion.div>
      <ToastContainer/>
    </motion.section>
  )
}

export default Subscribe