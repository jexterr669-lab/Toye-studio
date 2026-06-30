import { useState } from "react";

export default function FaqList({ faqs }) {
  const [open, setOpen] = useState(faqs[0]?.id ?? null);
  return (
    <div className="faq__list">
      {faqs.map((f) => {
        const isOpen = open === f.id;
        return (
          <div className="faq__item" key={f.id}>
            <button
              className="faq__q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : f.id)}
            >
              <span>{f.q}</span>
              <span className="faq__sign">{isOpen ? "–" : "+"}</span>
            </button>
            <div className={`faq__a ${isOpen ? "open" : ""}`}>
              <p>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
