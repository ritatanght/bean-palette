"use client";
import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

interface FAQ {
  question: string;
  answer: React.ReactNode;
}

const FAQItem: React.FC<{ item: FAQ; id: string }> = ({ item, id }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <h4
        className={`faqs__question ${expanded ? "expanded" : ""}`}
        onClick={() => setExpanded(!expanded)}
      >
        {item.question}
        <button
          className="icon-btn"
          aria-label="Expand/Collapse Answer"
          aria-expanded={expanded}
          aria-controls={id}
        >
          {expanded ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </h4>
      <div className={`faqs__answer ${expanded ? "expanded" : ""}`} id={id}>
        {item.answer}
      </div>
    </>
  );
};

export default FAQItem;
