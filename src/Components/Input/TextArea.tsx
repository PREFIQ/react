import Error from "../Input/Error";
import { MdErrorOutline } from "react-icons/md";
import React, { useId } from "react";

interface TextAreaProps {
  id?: string;
  label: string;
  placeholder: string;
  value: string;
  className?: string;
  err: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({
  id,
  label,
  value,
  className = "",
  err,
  rows = 4,
  onChange,
}: TextAreaProps) {
  const generatedId = useId();
  const textareaId = id || generatedId;

  return (
    <div className="relative w-full">
      <textarea
        id={textareaId}
        placeholder=" "
        value={value}
        rows={rows}
        onChange={onChange}
        className={`
          peer block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border
          appearance-none dark:text-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-ring
           peer placeholder-transparent
           ${className}
        `}
      />

      <label
        htmlFor={textareaId}
        className={`absolute text-sm text-foreground/90 bg-background px-2 transition-all
        transform -translate-y-4 scale-75 top-2 origin-[0] start-1 pointer-events-none
        peer-placeholder-shown:top-1/5 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
        peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4
        `}
      >
        {label}
      </label>

      {err && (
        <MdErrorOutline
          className="absolute right-3 top-3 text-red-500 text-xl"
          aria-hidden="true"
        />
      )}
      {err && <Error message={err} className="text-red-500 mt-1" id={textareaId} />}
    </div>
  );
}
