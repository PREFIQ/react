import { useEffect, useRef, useState } from "react";
import ImageButton from "./ImageBtn";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react-dom";

interface ButtonDropdownProps {
  icon: string;
  columns: string[];
  visibleColumns: string[];
  onChange: (updated: string[]) => void;
  className?:string
}

function ButtonDropdown({ icon, columns, visibleColumns, onChange, className }: ButtonDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, update } = useFloating({
    placement: "bottom-end",
    middleware: [offset(8), flip(), shift()],
  });

useEffect(() => {
  if (!dropdownOpen) return;

  const referenceEl = refs.reference.current;
  const floatingEl = refs.floating.current;

  if (referenceEl && floatingEl) {
    return autoUpdate(referenceEl, floatingEl, update);
  }
}, [dropdownOpen, refs.reference, refs.floating, update]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const toggleColumn = (column: string) => {
    if (visibleColumns.includes(column)) {
      onChange(visibleColumns.filter(c => c !== column));
    } else {
      onChange([...visibleColumns, column]);
    }
  };

  const allSelected = columns.every(col => visibleColumns.includes(col));

  const toggleSelectAll = () => {
    onChange(allSelected ? [] : [...columns]);
  };

  return (
    <div className="relative inline-block" ref={refs.setReference}>
      <ImageButton
        icon={icon}
        className={className}
        onClick={() => setDropdownOpen(prev => !prev)}
      />

      {dropdownOpen && (
        <div
          ref={(node) => {
            dropdownRef.current = node;
            refs.setFloating(node);
          }}
          style={floatingStyles}
          className="z-50 w-56 p-2 bg-background border border-border rounded shadow-lg"
        >
          <div className="flex items-center justify-between  px-1 text-xs text-muted-foreground">
            <span className="font-medium">Visible Columns</span>
            <button
              onClick={toggleSelectAll}
              className="text-primary hover:underline text-xs"
            >
              {allSelected ? "Deselect All" : "Select All"}
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-1">
            {columns.map((column) => (
              <label
                key={column}
                className="flex items-center gap-2 py-1 text-md cursor-pointer px-1 rounded hover:bg-muted/40"
              >
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(column)}
                  onChange={() => toggleColumn(column)}
                  className="cursor-pointer w-4 h-4 accent-update"
                />
                {column}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ButtonDropdown;
