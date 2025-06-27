import { useState, useEffect, useRef } from "react";
import { Check, X, ChevronDown } from "lucide-react";
import Error from "../Input/Error";

interface DropdownProps {
  id: string;
  className?: string;
  items: string[];
  placeholder: string;
  label?: string;
  err: string;
  multiple?: boolean;
  onChange?: (value: string | string[]) => void;
}

export default function DropdownRead({
  id,
  className,
  items,
  placeholder,
  label,
  err,
  multiple = false,
  onChange,
}: DropdownProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [direction, setDirection] = useState<'top' | 'bottom'>('bottom');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
        if (!multiple && selected.length) {
          setSearchTerm(selected[0]);
        } else if (multiple && searchTerm.trim() !== '') {
          if (!items.some(item => item.toLowerCase() === searchTerm.toLowerCase())) {
            setSearchTerm('');
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selected, multiple, items, searchTerm]);

  const determineDropdownDirection = () => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const threshold = 200;

      if (spaceBelow < threshold && spaceAbove > threshold) {
        setDirection("top");
      } else {
        setDirection("bottom");
      }
    }
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (item: string) => {
    if (multiple) {
      const updated = selected.includes(item)
        ? selected.filter((i) => i !== item)
        : [...selected, item];
      setSelected(updated);
      setSearchTerm("");
      onChange?.(updated);
    } else {
      setSelected([item]);
      setSearchTerm(item);
      onChange?.(item);
      setDropdownVisible(false);
    }
  };

  const removeItem = (item: string) => {
    const updated = selected.filter((i) => i !== item);
    setSelected(updated);
    onChange?.(updated);
    if (!multiple && updated.length === 0) {
      setSearchTerm("");
    }
  };

  const isSelected = (item: string) => selected.includes(item);
  const isLabelFloated = searchTerm.length > 0 || selected.length > 0;

  return (
    <div ref={wrapperRef} className="relative w-full font-inter">
      <div
        id={id}
        onClick={() => {
          determineDropdownDirection();
          setDropdownVisible(true);
          inputRef.current?.focus();
        }}
        className={`
          relative flex items-center flex-wrap gap-1 px-2 pt-1.5 pb-1
          border  border-ring/30 rounded-md transition-all cursor-pointer
          bg-background text-foreground/90 
          ${selected.length > 0 || searchTerm.length > 0 ? "min-h-[2.5rem]" : "h-10"}
          ${className}
        `}
      >
        {multiple && selected.length > 0 && (
          <div className="flex flex-wrap overflow-x-auto max-w-full hide-scrollbar gap-1">
            {selected.map((item) => (
              <span
                key={item}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-background text-foreground/80 text-sm"
              >
                {item}
                <X
                  className="w-3 h-3 cursor-pointer text-foreground/60"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item);
                  }}
                />
              </span>
            ))}
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          placeholder=" "
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setDropdownVisible(true);
            determineDropdownDirection();
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

        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 pointer-events-none" />
      </div>

      {dropdownVisible && (
        <div
          className={`
            absolute left-0 right-0 z-50 max-h-[25vh] overflow-auto mt-1
            border rounded-md shadow-lg
            bg-background text-foreground/90
            ${direction === "bottom" ? "top-full" : "bottom-full mb-1"}
            border-ring/30
          `}
        >
          <ul className="list-none p-0 m-0">
            {filteredItems.length ? (
              filteredItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => toggleSelect(item)}
                  className="flex justify-between items-center p-2 cursor-pointer hover:bg-muted"
                >
                  <span>{item}</span>
                  {isSelected(item) && <Check className="w-4 h-4 text-blue-600" />}
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-foreground/60">No items found</li>
            )}
          </ul>
        </div>
      )}

      {err && <Error message={err} className="mt-1 text-sm text-red-500" id={id} />}
    </div>
  );
}
