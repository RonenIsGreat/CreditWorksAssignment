import { useState, useEffect } from "react";

const useAsyncMemo = <T>(
  asyncFn: () => Promise<T>,
  dependencies: any[],
  defaultValue: T | null = null
): [T | null,boolean] => {
  const [value, setValue] = useState<T | null>(defaultValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const result = await asyncFn();
        if (isMounted) {
          setValue(result);
        }
      } finally {
        setIsLoading(false)
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return [value, isLoading];
};

export default useAsyncMemo;
