import React from 'react';

export function Input({ className, ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${className}`}
      {...props}
    />
  );
}
