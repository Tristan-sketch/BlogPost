"use client"
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick} className='text-xl p-4 m-4 rounded-md text-violet-400 hover:bg-violet-400 hover:text-white border-gray-400 border'>
      You pressed {count} times
    </button>
  );
}