import { Link } from 'react-router-dom';
import {
  Plus, Edit, Trash2, Eye, ChevronDown, ChevronUp, X, Search,
  ArrowUpWideNarrow, ArrowDownWideNarrow, EllipsisVertical, Filter,
  PrinterIcon, LucideFileJson2, LucideColumnsSettings,ExpandIcon,
  ChevronRight, ChevronLeft,
} from 'lucide-react';
import React from 'react';

type ButtonProps = {
  icon: string;
  path?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
};

const iconMap: Record<string, React.ReactNode> = {
  plus: <Plus size={18} />,
  edit: <Edit size={18} />,
  delete: <Trash2 size={18} />,
  view: <Eye size={18} />,
  chevronDown: <ChevronDown size={18} />,
  chevronUp: <ChevronUp size={18} />,
  close: <X size={18} />,
  search: <Search size={18} />,
  asc: <ArrowUpWideNarrow size={18} />,
  desc: <ArrowDownWideNarrow size={18} />,
  menu: <EllipsisVertical size={18} />,
  filter: <Filter size={18} />,
  print: <PrinterIcon size={18} />,
  export: <LucideFileJson2 size={18} />,
  column: <LucideColumnsSettings size={18} />,
  right: <ChevronRight size={18} />,
  left: <ChevronLeft size={18} />,
  fullscreen: <ExpandIcon size={18} />,
  
};

function ImageButton({ icon, path, className = '', onClick, children, disabled }: ButtonProps) {
  const IconComponent = iconMap[icon] ?? null;

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in iconMap`);
  }

  const content = (
    <div className="flex items-center gap-2">
      {IconComponent}
      {children}
    </div>
  );

  if (path) {
    return (
      <Link
        to={path}
        onClick={onClick}
        className={`px-4 py-2 rounded-md ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-md cursor-pointer ${className}`}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default ImageButton;
