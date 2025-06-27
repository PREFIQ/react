import { useState, useEffect, useRef } from "react";
import CreateMenu from "../common/CreateMenu";
import Error from "./Error";

interface DropdownProps {
  id: string;
  className?: string;
  items: string[];
  onChange?: (value: string | string[]) => void;
  placeholder: string;
  label?: string;
  err: string;
  multiple?: boolean;
}

function Dropdown({
  id,
  className,
  items,
  onChange,
  placeholder,
  label,
  err,
  multiple = false,
}: DropdownProps) {
  const [localItems, setLocalItems] = useState<string[]>(items);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        if (!localItems.some(item => item.toLowerCase() === searchTerm.toLowerCase())) {
          setSearchTerm('');
        }
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchTerm, localItems]);

  const filteredItems = localItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemNotPresent =
    searchTerm.trim().length > 0 &&
    !localItems.some((item) => item.toLowerCase() === searchTerm.toLowerCase());

  const toggleSelect = (item: string) => {
    if (multiple) {
      const updated = selectedItems.includes(item)
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item];
      setSelectedItems(updated);
      onChange?.(updated);
      setSearchTerm('');
    } else {
      setSelectedItems([item]);
      setSearchTerm(item);
      onChange?.(item);
      setDropdownVisible(false);
    }
  };

  const removeItem = (item: string) => {
    const updated = selectedItems.filter(i => i !== item);
    setSelectedItems(updated);
    onChange?.(updated);
  };

  const isSelected = (item: string) => selectedItems.includes(item);

  const handleDropdownOpen = () => {
    setDropdownVisible(true);
    inputRef.current?.focus();

    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropdownPosition(spaceBelow < 200 && spaceAbove > spaceBelow ? 'top' : 'bottom');
    }
  };

  const isLabelFloated = searchTerm.length > 0 || (multiple && selectedItems.length > 0);

  return (
    <div ref={wrapperRef} className="relative w-full font-inter">
      <div
        id={id}
        onClick={handleDropdownOpen}
        className={`
          relative flex items-center flex-wrap gap-1 px-2 pt-1.5 pb-1
          border  border-ring/30 rounded-md transition-all cursor-pointer
          bg-background text-foreground/90
          ${selectedItems.length > 0 ? "min-h-[2.5rem]" : "h-10"}
          ${className}
        `}
      >
        <div className="flex flex-nowrap overflow-x-auto max-w-full hide-scrollbar">
          {multiple &&
            selectedItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-1 mx-0.5 px-2 py-1 rounded-full bg-background text-foreground/80 text-sm"
              >
                {item}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item);
                  }}
                  className="ml-1 text-foreground/60 hover:text-blue-600"
                >
                  &times;
                </button>
              </div>
            ))}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          placeholder=" "
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setDropdownVisible(true);
          }}
          className={`
            flex-1 bg-background px-1 py-1 text-sm text-foreground/90 outline-none
            placeholder-transparent peer min-w-[50px] 
          `}
        />

        <label
          htmlFor={id}
          className={`
            absolute left-2.5 z-10 px-1 text-sm bg-background text-foreground/60
            transition-all transform origin-[0]
            peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4
            ${isLabelFloated ? "top-2 scale-75 -translate-y-4" : "top-1/2 -translate-y-1/2 scale-100"}
          `}
        >
          {label || placeholder}
        </label>

        <svg
          className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {dropdownVisible && (
        <div
          className={`absolute left-0 right-0 z-50 max-h-[25vh] overflow-auto mt-1
            border  rounded-md shadow-lg
            bg-background text-foreground/90
            ${dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full'}
            border-ring/30
          `}
        >
          <ul className="list-none p-0 m-0">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li
                  key={index}
                  className="p-2 flex justify-between items-center cursor-pointer hover:bg-muted"
                  onClick={() => toggleSelect(item)}
                >
                  <span>{item}</span>
                  {isSelected(item) && (
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-foreground/60">No items found</li>
            )}
          </ul>

          {itemNotPresent && (
            <button
              className="p-2 w-full text-left border-t text-blue-600 hover:bg-muted border-ring/20"
              onClick={() => {
                setDropdownVisible(false);
                setTimeout(() => setIsCreating(true), 0);
              }}
            >
              Create "{searchTerm}"
            </button>
          )}
        </div>
      )}

      {isCreating && (
        <CreateMenu
          defaultValue={searchTerm}
          onClose={() => setIsCreating(false)}
          onAdd={(newItem: string) => {
            const updated = Array.from(new Set([...localItems, newItem]));
            setLocalItems(updated);
            toggleSelect(newItem);
            setIsCreating(false);
            setDropdownVisible(false);
          }}
        />
      )}

      {err && <Error message={err} className="mt-1 text-sm text-red-500" id={id} />}
    </div>
  );
}

export default Dropdown;
