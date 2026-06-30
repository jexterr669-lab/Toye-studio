import { useEffect, useRef, useState } from "react";

// Adds a quiet fade-up the first time an element scrolls into view.
// Honours prefers-reduced-motion via CSS in index.css.
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${shown ? "is-visible" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
