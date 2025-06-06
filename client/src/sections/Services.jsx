import ServiceCard from "../Components/ServiceCard"
import { services } from "../Constants"
import { motion } from "framer-motion"

const Services = () => {
  const fadeIn = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration: duration || 0.5,
        ease: 'easeOut',
      },
    },
  });

  const staggerContainer = (staggerChildren, delayChildren) => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  });

  return (
    <motion.section 
      className="max-container flex justify-center flex-wrap gap-9"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={staggerContainer(0.2, 0.1)}
    >
      {services.map((service, index) => (
        <motion.div
          key={service.label}
          variants={fadeIn('up', 'tween', 0.1, 0.4)}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ServiceCard {...service}/>
        </motion.div>
      ))}
    </motion.section>
  )
}

export default Services