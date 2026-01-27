// ParallaxSection.js
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxSection({ children, speed = 0.5, className = "" }) {
  const ref = useRef(null);

  // Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Trigger when top enters bottom of screen
  });

  // Calculate movement: 
  // When scrolling down, the element moves slightly up (creating depth)
  // Adjust the range ["50px", "-50px"] to increase/decrease intensity
  const y = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }} // Apply the parallax Y and Fade effect
      className={className}
    >
      {children}
    </motion.div>
  );
}