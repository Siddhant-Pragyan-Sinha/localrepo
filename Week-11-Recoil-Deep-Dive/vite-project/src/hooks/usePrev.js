import { useState, useEffect, useRef } from 'react';

export const usePrev = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;  // INFO-the first value is undefined here
}
//NOTE-It returns first, effect gets called later on