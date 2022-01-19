import { useState, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";

function Child() {
  console.log("child is update");

  return <div>child</div>;
}

function App() {
  const [count, setCount] = useState(0);

  const fn = () => {
    console.log("xxx");
  };

  const fnm = useCallback(() => {
    fn();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <Child fnm={fnm} />
      </header>
    </div>
  );
}

export default App;
