import { useRef, useState, useEffect } from 'react';

function useDebounce(originalFn) {
  const currentClock = useRef();

  const fn = () => {
    clearTimeout(currentClock.current);
    currentClock.current = setTimeout(originalFn, 200);
  };

  return fn;
}

function App() {
  function sendDataToBackend() {
  
    fetch('api.amazon.com/search/');

  }
  const debouncedFn = useDebounce(sendDataToBackend);
  return (
    <>
      <input type="text" onChange={debouncedFn}></input>
    </>
  );
}

export default App;