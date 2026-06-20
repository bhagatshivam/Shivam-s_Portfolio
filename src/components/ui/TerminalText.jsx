import { motion } from "framer-motion";

export default function TerminalText({ command, value, valueColor = "#10B981", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="font-display text-sm flex flex-wrap gap-x-3"
    >
      <span className="text-text-secondary">
        <span className="text-accent-green">$</span> {command}
      </span>
      <span style={{ color: valueColor }}>→ {value}</span>
    </motion.div>
  );
}
