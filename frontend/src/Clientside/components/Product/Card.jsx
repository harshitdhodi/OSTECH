import React from 'react';

// Card component
export function Card({ className, children, ...props }) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
}

// CardHeader component
export function CardHeader({ className, children, ...props }) {
  return (
    <div className={` ${className}`} {...props}>
      {children}
    </div>
  );
}

// CardContent component
export function CardContent({ className, children, ...props }) {
  return (
    <div className={`px-6 py-1 ${className}`} {...props}>
      {children}
    </div>
  );
}

// CardTitle component
export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={`text-xl font-semibold ${className}`} {...props}>
      {children}
    </h3>
  );
}

// CardDescription component
export function CardDescription({ className, children, ...props }) {
  return (
    <p
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
