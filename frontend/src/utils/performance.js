// Performance monitoring utility
export const measurePerformance = (componentName) => {
  const start = performance.now();
  
  return () => {
    const duration = performance.now() - start;
    if (duration > 16.67) { // Longer than one frame (60fps)
      console.warn(`${componentName} took ${duration}ms to render`);
    }
  };
}; 