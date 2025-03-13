import { useState, useEffect, useRef } from 'react';

const CustomSelect = ({ options, defaultOption, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      listRef.current?.focus();
    } else {
      buttonRef.current?.focus();
    }
  }, [isOpen]);

  const handleOptionClick = (option, index) => {
    setSelectedOption(option);
    setIsOpen(false);
    setHighlightedIndex(index);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prevIndex) =>
          prevIndex === options.length - 1 ? 0 : prevIndex + 1
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prevIndex) =>
          prevIndex === 0 ? options.length - 1 : prevIndex - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen) {
          handleOptionClick(options[highlightedIndex], highlightedIndex);
        } else {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative inline-block w-full">
      <input type="hidden" name={name} value={selectedOption} />
      <button
        type="button"
        className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        ref={buttonRef}
      >
        <span className="block truncate">{selectedOption}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          tabIndex="-1"
          ref={listRef}
          onKeyDown={handleKeyDown}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                highlightedIndex === index ? 'text-white bg-indigo-600' : 'text-gray-900'
              }`}
              onClick={() => handleOptionClick(option, index)}
              onMouseEnter={() => setHighlightedIndex(index)}
              role="option"
              aria-selected={highlightedIndex === index}
            >
              <span className={`block truncate ${selectedOption === option ? 'font-semibold' : 'font-normal'}`}>
                {option}
              </span>

              {selectedOption === option && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 9l3 3L15 5" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
