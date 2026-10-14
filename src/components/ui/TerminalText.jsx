import { motion } from "framer-motion";

export default function TerminalText({ command, value, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="font-mono text-sm flex flex-wrap gap-x-3"
    >
      <span className="text-text-secondary">
        <span className="text-accent">$</span> {command}
      </span>
      <span className="text-text-primary">→ {value}</span>
    </motion.div>
  );
}
