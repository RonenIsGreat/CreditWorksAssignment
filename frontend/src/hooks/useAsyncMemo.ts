import { useState, useEffect } from 'react';

const useAsyncMemo = <T>(asyncFn: () => Promise<T>, dependencies: any[]): T | null => {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const result = await asyncFn();
      if (isMounted) {
        setValue(result);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return value;
};

export default useAsyncMemo;
