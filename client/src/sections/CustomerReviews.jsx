import ReviewCard from "../Components/ReviewCard"
import { reviews } from "../Constants"
import { motion } from "framer-motion"

const CustomerReviews = () => {
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
      className="max-container"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.h3 
        className="font-palanquin text-center text-4xl font-bold"
        variants={fadeIn('up', 0.2)}
      >
        What Our
        <span className="text-coral-red"> Customers </span>
        Say?
      </motion.h3>
      <motion.p 
        className="info-text m-auto mt-4 max-w-lg text-center"
        variants={fadeIn('up', 0.3)}
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
            variants={fadeIn('up', 0.2 * index)}
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