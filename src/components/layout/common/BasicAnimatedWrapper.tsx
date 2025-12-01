"use client";

import { motion, TargetAndTransition, VariantLabels } from "framer-motion";

const BasicAnimatedWrapper = ({
  children,
  index,
  className,
  whileHover,
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
  whileHover?: TargetAndTransition | VariantLabels;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index! * 0.1 || 0 }}
      viewport={{ once: false }}
      whileHover={whileHover}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default BasicAnimatedWrapper;
