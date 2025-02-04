import React from 'react';

export function Button({ className, variant = 'default', children, isSelected, ...props }) {
  const baseStyle = 'px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transform transition-all duration-300';
  const variantStyles = {
    default: 'bg-white text-black hover:bg-gray-100 hover:shadow-lg hover:translate-y-[-2px] focus:ring-[#1290ca]',
    outline: 'border border-gray-300 text-gray-700 hover:bg-[#ffffff] hover:shadow-lg hover:translate-y-[-2px] focus:ring-[#1290ca]',
  };

  const selectedStyle = isSelected ? 'ring-2 ring-[#1290ca]' : '';
  const shadowStyle = 'shadow-md hover:text-[#1290ca] hover:shadow-[#0b0f14] hover:shadow-lg shadow-[#0b0f14]';

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${shadowStyle} ${className} ${selectedStyle}`}
      {...props}
    >
      {children}
    </button>
  );
}
