import { Label } from "../label";
import Error from "./Error";
import { MdErrorOutline } from "react-icons/md";

interface TextInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  type: string;
  err: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput({
  id,
  label,
  placeholder,
  value,
  type,
  err,
  className = "",
  onChange,
}: TextInputProps) {
  return (
    <div className="w-full items-start flex flex-col gap-1">
      <Label className={`bg-background ${err ? 'text-error':' text-foreground'}`} htmlFor={id}>
        {label}
      </Label>

      <div className="relative mt-2 w-full bg-background text-foreground">
        <input
          type={type}
          id={id}
          style={err ? { borderColor: 'var(--color-error)' } : {}}
          className={`w-full pr-10 bg-background border border-ring/80 p-2 text-foreground rounded-sm peer text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transform duration-300 ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {err && (
          <MdErrorOutline
            className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xl"
            aria-hidden="true"
          />
        )}
      </div>

      {err && <Error message={err} className="mt-1" id={id} />}
    </div>
  );
}
