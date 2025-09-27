// FIX: The 'Cannot find namespace JSX' error is resolved by importing React.
import React from 'react';

interface ActionButtonProps {
  href: string;
  download?: string | boolean;
  icon: JSX.Element;
  label: string;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ href, download, icon, label, className }) => {
  return (
    <a
      href={href}
      target={download ? '_self' : '_blank'}
      rel="noopener noreferrer"
      download={download}
      className={`flex items-center justify-center gap-3 px-6 py-3 font-semibold text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 ${className}`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

export default ActionButton;