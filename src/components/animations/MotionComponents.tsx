"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

// Animação de fade in
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className,
  ...props
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
} & HTMLMotionProps<"div">) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Animação de slide in da esquerda
export const SlideInLeft = ({
  children,
  delay = 0,
  duration = 0.5,
  className,
  ...props
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
} & HTMLMotionProps<"div">) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Animação de slide in da direita
export const SlideInRight = ({
  children,
  delay = 0,
  duration = 0.5,
  className,
  ...props
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
} & HTMLMotionProps<"div">) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Animação de escala (zoom)
export const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className,
  ...props
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
} & HTMLMotionProps<"div">) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration, type: "spring", stiffness: 100 }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Animação de bounce para chamar atenção
export const Bounce = ({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & HTMLMotionProps<"div">) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Animação de pulso
export const Pulse = ({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & HTMLMotionProps<"div">) => (
  <motion.div
    animate={{
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Animação de stagger para múltiplos elementos
export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  className,
  ...props
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
} & HTMLMotionProps<"div">) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerChild = ({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & HTMLMotionProps<"div">) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Hook para animações de hover
export const useHoverAnimation = () => ({
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 17 },
});
