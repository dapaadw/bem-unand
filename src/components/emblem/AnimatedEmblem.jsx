'use client';

import { motion } from 'framer-motion';
import { leaf, wingRedL, wingRedR, wingDarkL, wingDarkR, fist } from './emblemPaths';

const EASE = [0.16, 1, 0.3, 1];

// Reversed palette for dark surfaces: the charcoal parts become ivory and the red is lifted to keep 3:1 against #1a0a13.
const DEFAULT_COLORS = { red: '#c8283f', dark: '#fdfdfd', stroke: '#e8c4c2' };

function Part({ d, fill, stroke, delay, from }) {
  const subpaths = d.match(/M[^M]+/g) || [d];

  return (
    <motion.g
      initial={from}
      animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      style={{ transformBox: 'fill-box', transformOrigin: '50% 100%', originX: '50%', originY: '100%' }}
    >
      {subpaths.map((subpath, idx) => (
        <motion.path
          key={idx}
          d={subpath}
          fill="none"
          stroke={stroke}
          strokeWidth={1.4}
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 0 }}
          transition={{
            pathLength: { duration: 0.85, delay, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 0.35, delay: delay + 0.8 },
          }}
        />
      ))}
      <motion.path
        d={d}
        fill={fill}
        fillRule="evenodd"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: delay + 0.55, ease: 'easeOut' }}
      />
    </motion.g>
  );
}

export default function AnimatedEmblem({ className = '', colors = DEFAULT_COLORS, title = 'Lambang BEM FH UNAND' }) {
  const c = { ...DEFAULT_COLORS, ...colors };

  return (
    <svg viewBox="85 39 330 377" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      {/* Wings close in from the sides, the fist rises, then the leaf grows from its stem. */}
      <Part d={wingDarkL} fill={c.dark} stroke={c.stroke} delay={0} from={{ x: -18, opacity: 0 }} />
      <Part d={wingDarkR} fill={c.dark} stroke={c.stroke} delay={0} from={{ x: 18, opacity: 0 }} />
      <Part d={wingRedL} fill={c.red} stroke={c.stroke} delay={0.12} from={{ x: -14, opacity: 0 }} />
      <Part d={wingRedR} fill={c.red} stroke={c.stroke} delay={0.12} from={{ x: 14, opacity: 0 }} />
      <Part d={fist} fill={c.dark} stroke={c.stroke} delay={0.24} from={{ y: 20, opacity: 0 }} />
      <Part d={leaf} fill={c.red} stroke={c.stroke} delay={0.4} from={{ scale: 0.7, opacity: 0 }} />
    </svg>
  );
}
