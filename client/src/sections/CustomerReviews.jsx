import ReviewCard from "../Components/ReviewCard"
import { reviews } from "../Constants"
import { motion } from "framer-motion"

const CustomerReviews = () => {
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
      className="max-container"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.h3 
        className="font-palanquin text-center text-4xl font-bold"
        variants={fadeIn('up', 'tween', 0.2, 0.4)}
      >
        What Our
        <span className="text-coral-red"> Customers </span>
        Say?
      </motion.h3>
      <motion.p 
        className="info-text m-auto mt-4 max-w-lg text-center"
        variants={fadeIn('up', 'tween', 0.3, 0.4)}
      >
        Hear genuine stories from our satisfied customers about their exceptional
        experiences with us.
      </motion.p>
      <motion.div 
        className="mt-24 flex flex-1 justify-evenly items-center max-lg:flex-col gap-14"
        variants={staggerContainer(0.2, 0.1)}
      >
        {reviews.map((review, index) => (
          <motion.div
            key={review.customerName}
            variants={fadeIn('up', 'tween', 0.1 * index, 0.4)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ReviewCard
              imgURL={review.imgURL}
              customerName={review.customerName}
              rating={review.rating}
              feedback={review.feedback}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

export default CustomerReviews