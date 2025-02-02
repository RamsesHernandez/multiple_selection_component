"use client";
import { useState, useRef, useEffect, JSX } from "react";

interface MultiSelectInputProps {
  options: string[];
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({ options }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectAllActive, setSelectAllActive] = useState<boolean>(false);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const inputContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputContainerRef.current && !inputContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setSelectAllActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredOptions(
      options.filter(
        (option: string) =>
          option.toLowerCase().includes(value.toLowerCase()) &&
          !selectedTags.includes(option)
      )
    );
    setHighlightedIndex(-1);
    setShowDropdown(true);
    setSelectAllActive(false);
  };

  const handleSelectOption = (option: string): void => {
    if (!selectedTags.includes(option)) {
      setSelectedTags((prev: string[]) => [...prev, option]);
    }
    setInputValue("");
    setFilteredOptions(options.filter((opt) => !selectedTags.includes(opt)));
    setHighlightedIndex(-1);
    setShowDropdown(false);
    setSelectAllActive(false);
  };

  const handleRemoveTag = (tag: string): void => {
    setSelectedTags((prev: string[]) => prev.filter((t: string) => t !== tag));
    setFilteredOptions(options.filter((opt) => !selectedTags.includes(opt)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.ctrlKey && (e.key.toLowerCase() === "a")) {
      e.preventDefault();
      setSelectAllActive((prev) => !prev);
    } else if (e.key === "Enter" && selectAllActive) {
      setSelectedTags((prev) => [...new Set([...prev, ...filteredOptions])]);
      setInputValue("");
      setShowDropdown(false);
      setSelectAllActive(false);
    } else if (e.key === "Backspace" && inputValue === "" && selectedTags.length > 0) {
      setSelectedTags((prev) => prev.slice(0, -1));
      setFilteredOptions(options.filter((opt) => !selectedTags.includes(opt)));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelectOption(filteredOptions[highlightedIndex]);
      e.preventDefault();
    } else if (e.key === "Enter" && inputValue.trim() !== "") {
      handleSelectOption(inputValue.trim());
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
    }
  };

  const handleInputFocus = (): void => {
    setShowDropdown(true);
  };

  const highlightMatch = (option: string): JSX.Element => {
    if (!inputValue) return <span>{option}</span>;

    const regex = new RegExp(`(${inputValue})`, "gi");
    const parts = option.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === inputValue.toLowerCase() ? (
            <span key={index} className="underline font-bold">{part}</span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200 p-8">
      <h1 className="text-lg font-semibold text-blue-500 mb-4 self-start">Chart type</h1>
      <div ref={inputContainerRef} className="relative w-80">
        <div className="flex flex-wrap gap-2 border-2 p-2 rounded-lg bg-white border-blue-300 focus-within:border-blue-600">
          {selectedTags.map((tag: string) => (
            <div
              key={tag}
              className="flex items-center px-2 py-1 rounded-md bg-blue-500 text-white"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-xs focus:outline-none"
              >
                ✕
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            className="flex-grow focus:outline-none p-1"
            placeholder="Try me..."
          />
        </div>
        {showDropdown && (
          <ul className="absolute bg-white border rounded-lg w-full mt-1 shadow-lg max-h-40 overflow-y-auto">
            {filteredOptions.map((option: string, index) => (
              <li
                key={option}
                ref={(el) => (optionRefs.current[index] = el)}
                className={`p-2 cursor-pointer flex justify-between ${highlightedIndex === index || selectAllActive ? 'bg-blue-400 text-white' : 'hover:bg-gray-200'}`}
                onClick={() => handleSelectOption(option)}
              >
                {highlightMatch(option)}
              </li>
            ))}
            {inputValue.trim() !== "" && !options.includes(inputValue.trim()) && !selectedTags.includes(inputValue.trim()) && (
              <li
                className="p-2 hover:bg-gray-200 cursor-pointer flex justify-between"
                onClick={() => handleSelectOption(inputValue.trim())}
              >
                {inputValue} <span className="text-gray-500 text-sm">(new value)</span>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultiSelectInput;