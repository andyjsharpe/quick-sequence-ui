//import logo from './logo.svg';
import './App.css';
import FrameHolder from "./FrameHolder";
import ListScroller from "./ListScroller";
import React, { useState } from 'react';

function App() {
    const [frames, setFrames] = useState([null]);

    const increaseSize = () => {
        setFrames((prevArray) => [...prevArray, null]);
    };

  return (
    <div className="App">
      <header className="App-header">
          Test Application:
          <button onClick={increaseSize}>New Frame</button>
          <ListScroller items={frames}/>
      </header>
    </div>
  );
}

export default App;
