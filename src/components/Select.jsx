import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * A themed dropdown select component that supports both string and object options
 * @param {string|number} value - The currently selected value
 * @param {Array} options - Array of strings or objects with {label, value} structure
 * @param {Function} onChange - Callback when selection changes
 * @param {string} placeholder - Placeholder text when no value is selected
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Whether the select is disabled
 */
const Select = ({
  value,
  options = [],
  onChange,
  placeholder = "Select an option",
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Normalize options to always have {label, value} structure
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "string" || typeof opt === "number") {
      return { label: String(opt), value: opt };
    }
    return opt;
  });

  // Find the current selected option
  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option) => {
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
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
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`flex items-center justify-between w-full bg-(--color-surface) border border-(--color-border) rounded-md px-3 py-2 text-sm focus:outline-none focus:border-(--color-accent) transition-colors duration-200 ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-(--color-accent) cursor-pointer"
        } ${!selectedOption ? "text-(--color-muted)" : ""}`}
      >
        <span className="truncate">{displayValue}</span>
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
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-(--color-surface) border border-(--color-border) rounded-md shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto">
          {normalizedOptions.map((option, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-3 py-2 text-sm transition-colors duration-150 ${
                option.value === value
                  ? "bg-(--color-accent) text-(--color-bg)"
                  : "hover:bg-(--color-border)"
              }`}
            >
              {option.label}
            </button>
          ))}
          {normalizedOptions.length === 0 && (
            <div className="px-3 py-2 text-sm text-(--color-muted)">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      }),
    ])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Select;
