import React from "react";
import Error from "./Error";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  autoFocus?: boolean;
  type: string;
  err: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  id,
  label,
  autoFocus = false,
  type,
  err,
  className,
  value,
  onChange,
}) => {
  return (
    <div>
      <div className="relative w-full">
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          placeholder=" "
          autoComplete="off"
          className={`block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-ring/30 appearance-none tracking-wide dark:bg-dark dark:text-dark-9
            focus:outline-none focus:ring-2 focus:ring-ring/30 peer ${className}`}
        />

        <label
          htmlFor={id}
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-background px-2
            peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
            peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
        >
          {label}
        </label>
      </div>
      {err && <Error message={err} className="mt-1" id={id} />}
    </div>
  );
};

export default FloatingInput;
