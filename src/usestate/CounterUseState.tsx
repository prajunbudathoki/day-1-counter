import { MouseEventHandler, useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  const increment: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setCounter((prev) => prev + 1);
  };

  const decrement: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setCounter((prev) => prev - 1);
  };

  const reset: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setCounter(0);
  };

  return (
    <>
      <h1>Counter App (useState Hook)</h1>
      <div>
        <h2>Count: {counter}</h2>
      </div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>_</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}
