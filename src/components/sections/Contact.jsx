import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail } from "lucide-react";

const contactLinks = [
  {
    icon: "mail",
    label: "Email",
    value: "bhagatshivam082@gmail.com",
    href: "mailto:bhagatshivam082@gmail.com",
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/shivam-bhagat",
    href: "https://www.linkedin.com/in/shivam-bhagat",
  },
  {
    icon: "github",
    label: "GitHub",
    value: "github.com/bhagatshivam",
    href: "https://github.com/bhagatshivam",
  },
];

function GithubGlyph({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.654 1.653.242 2.873.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.804 5.624-5.476 5.92.43.37.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .322.216.696.825.577C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function LinkedinGlyph({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function ContactIcon({ type }) {
  if (type === "mail") return <Mail size={18} />;
  if (type === "linkedin") return <LinkedinGlyph size={18} />;
  if (type === "github") return <GithubGlyph size={18} />;
  return null;
}

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div ref={ref} className="py-32 px-6">
      <div className="max-w-xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl md:text-5xl text-text-primary mb-6"
          style={{ textShadow: "0 0 30px rgba(79,142,247,0.25)" }}
        >
          Let's build something.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-body text-text-secondary text-sm md:text-base mb-12 leading-relaxed"
        >
          I'm currently finishing my MSc at Manchester and looking for my next challenge.
          Whether it's a graduate role, a collaboration, or just a conversation about AI — I'm reachable.
        </motion.p>

        <div className="flex flex-col gap-4 mb-12">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.icon !== "mail" ? "_blank" : undefined}
              rel={link.icon !== "mail" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="group flex items-center gap-4 p-4 rounded-lg border border-border bg-surface hover:border-accent-blue transition-all duration-200"
            >
              <span className="w-9 h-9 rounded-full flex items-center justify-center border border-border text-accent-blue group-hover:border-accent-blue transition-colors duration-200">
                <ContactIcon type={link.icon} />
              </span>
              <span className="flex flex-col items-start">
                <span className="font-display text-xs text-text-secondary">{link.label}</span>
                <span className="font-body text-sm text-text-primary">{link.value}</span>
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="border-t border-border pt-8 space-y-2"
        >
          <p className="font-display text-xs text-text-secondary">
            [ Global Talent Scholar — University of Manchester ]
          </p>
          <p className="font-display text-xs text-text-secondary">
            [ Karate Black Belt — because discipline ships features ]
          </p>
        </motion.div>

        <p className="font-display text-xs text-text-secondary mt-10 opacity-60">
          © 2026 Shivam Bhagat — Built with React, Vite &amp; too much coffee
        </p>
      </div>
    </div>
  );
}
