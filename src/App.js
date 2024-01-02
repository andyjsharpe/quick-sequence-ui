//import logo from './logo.svg';
import './App.css';
import ListScroller from "./ListScroller";
import React, { useState } from 'react';
import SaveButton from './SaveButton';
import LoadButton from "./LoadButton";

const Frame = function(inId, inSeed, inPositive, inNegative) {
    const id = inId;
    const seed = inSeed;
    const positive = inPositive;
    const negative = inNegative;
    return {'id': id, 'seed': seed, 'positive': positive, 'negative': negative};
};

const BlankFrame = function(id) {
    return Frame(id, 0, "", "");
}

function App() {

    const [frames, setFrames] = useState([BlankFrame(0)]);

    const increaseSize = () => {
        // Create new blank frame
        setFrames((prevArray) => [...prevArray, BlankFrame(frames.length)]);
    };

    function updateFrameList(prevArray, changedFrame, id){
        // Find the index of the dictionary with the specified id
        const indexToUpdate = prevArray.findIndex(item => item.id === id);

        // If the dictionary with the specified id is found, update it
        if (indexToUpdate !== -1) {
            prevArray[indexToUpdate] = changedFrame; // Update the dictionary
        }

        // If the id is not found, return the original array
        return prevArray;
    }

    function updateFrame(changedFrame, id){
        setFrames((prevArray) => updateFrameList(prevArray, changedFrame, id));
    }

    function overwrite(frameData) {
        console.log(frameData)
        setFrames((prevArray) => frameData);
    }


  return (
    <div className="App">
        <header className="App-header">
            <div className="Nav">
                <b>Test Application:</b>
                    <button onClick={increaseSize}><b>New Frame</b></button>
                    <SaveButton frames={frames}/>
                    <LoadButton onFileRead={overwrite}/>
            </div>
            <ListScroller items={frames} callback={updateFrame}/>
        </header>
    </div>
  );
}

export default App;
