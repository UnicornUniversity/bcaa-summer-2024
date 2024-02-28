import { useState } from "react";
import "./App.css";
import Employee from "./Employee";

function App() {
  const [count, setCount] = useState(10);

  const numberList = [];

  for (let i = 0; i < count; i++) {
    numberList.push(
      <Employee key={i} name={Math.random()} showTime={i === 0} />
    );
  }

  return (
    <div className="App">
      <button
        type="button"
        onClick={() => setCount(5 + Math.ceil(Math.random() * 10))}
      >
        Click Me!
      </button>
      {numberList}
    </div>
  );
}

export default App;
