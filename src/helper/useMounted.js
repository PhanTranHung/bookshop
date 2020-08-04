import { useEffect, useState } from "react";

export const useMounted = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    // eslint-disable-next-line
  }, []);
  return isMounted;
};
