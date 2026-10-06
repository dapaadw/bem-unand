'use client';

import { motion } from 'framer-motion';

export default function FluidScrollSection({
  children,
  className = '',
  id,
  delay = 0,
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.section>
  );
}
