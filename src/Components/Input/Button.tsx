import { Link } from 'react-router-dom';

type ButtonProps = {
  label: string;
  path?: string;
  className?: string;
  onClick?: () => void;
    children: React.ReactNode; 
};

function Button({ label, path, className, onClick }: ButtonProps) {
  if (path) {
    return (
      <Link
        to={path}
        onClick={onClick}  // 👈 this line is important!
        className={`${className} px-4 py-2 rounded-md`}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${className} px-4 py-2 rounded-md cursor-pointer`}
    >
      {label}
    </button>
  );
}

export default Button;
