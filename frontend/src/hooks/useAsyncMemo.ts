import { useState, useEffect } from "react";

const useAsyncMemo = <T>(
  asyncFn: () => Promise<T>,
  dependencies: any[],
  defaultValue: T | null = null
): T | null => {
  const [value, setValue] = useState<T | null>(defaultValue);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = await asyncFn();
        if (isMounted) {
          setValue(result);
        }
      } finally {
        if (isMounted) {
        }
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
