import ServiceCard from "../Components/ServiceCard"
import { services } from "../Constants"
import { motion } from "framer-motion"

const Services = () => {
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
          variants={fadeIn('up', 0.2 * index)}
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