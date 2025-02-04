import { useState, useEffect } from 'react';

export const useWorker = (workerPath) => {
  const [worker] = useState(() => new Worker(workerPath));
  
  useEffect(() => {
    return () => worker.terminate();
  }, [worker]);

  const processData = (data) => {
    return new Promise((resolve) => {
      worker.postMessage({ type: 'PROCESS_DATA', data });
      worker.onmessage = (e) => {
        if (e.data.type === 'PROCESSED_DATA') {
          resolve(e.data.result);
        }
      };
    });
  };

  return { processData };
}; 