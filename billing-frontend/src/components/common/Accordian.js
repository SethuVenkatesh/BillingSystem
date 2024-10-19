import React, { useState } from "react";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const accordionItems = [
    { title: "Accordion Item 1", content: "Content for Item 1" },
    { title: "Accordion Item 2", content: "Content for Item 2" },
    { title: "Accordion Item 3", content: "Content for Item 3" },
  ];

  return (
    <div className="max-w-md mx-auto">
      {accordionItems.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            className="flex justify-between items-center py-4 px-6 w-full text-left focus:outline-none transition duration-600 ease-in-out"
            onClick={() => toggleAccordion(index)}
          >
            <span className="font-medium">{item.title}</span>
            <svg
              className={`w-5 h-5 transition-transform ${
                openIndex === index ? "transform rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            className={`${
              openIndex === index ? "block" : "hidden"
            } px-6 py-4 transition-all duration-600 ease-in-out`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
