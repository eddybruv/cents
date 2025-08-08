import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({
  value = "Total Balance- $6,45,256",
  options = [
    "Total Balance- $6,45,256",
    "Available Balance- $5,32,180",
    "Pending Balance- $1,13,076",
    "Locked Balance- $45,320",
  ],
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={selectRef}>
      {/* Select Button */}
      <button
        onClick={handleToggle}
        className="flex items-center justify-between bg-black border border-gray-600 rounded-lg px-4 py-3 text-white text-sm font-medium hover:border-gray-600 focus:outline-none cursor-pointer transition-all duration-200 min-w-[200px]"
      >
        <span className="truncate">{selectedValue}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 ${
                option === selectedValue
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
