import React, { useEffect, useState} from "react";

export const useMounted = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    debugger;
    setIsMounted(true);
    // eslint-disable-next-line
  }, []);
  return isMounted;
};