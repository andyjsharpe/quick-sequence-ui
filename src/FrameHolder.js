// FrameHolder.js
import React, { useState, useEffect } from "react";
import "./FrameHolder.css";
import Frame from "./App.js";
import BlankFrame from "./App.js";

function FrameHolder({frame, callback}) {

    const [imageData, setImageData] = useState(frame.image);
    const [input1, setInput1] = useState(frame.positive);
    const [input2, setInput2] = useState(frame.negative);
    const [inputSeed, setInputSeed] = useState(frame.seed);
    useEffect(sendCallback, [callback, frame, imageData, input1, input2, inputSeed])

    async function postImage(data) {
        const response = await fetch("http://127.0.0.1:7860/sdapi/v1/txt2img", {
            mode: 'cors',
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => saveValues(setImageData, data.images[0]))
            .catch(error => console.error(error));
    }

    const constantPayload = {
        styles: [
            "Standard Simple",
            "Camera",
            "Detail"
        ],
        sampler_name: "DPM++ 2M Karras",
        denoising_strength: 0.7,
        alwayson_scripts: {
            // https://github.com/hako-mikan/sd-webui-regional-prompter?tab=readme-ov-file#how-to-use-via-api
            'Regional Prompter': {
                //"1,1" assumes a half split, but this can be changed
                "args": [true,false,"Matrix","Columns","Mask","Prompt","1,1,1,1","",false,false,false,"Attention",false,"0","0","0",""]
            }}
    }

    useEffect(() => {
        setInput1(frame.positive);
        setInput2(frame.negative);
        setInputSeed(frame.seed);
        setImageData(frame.image);
    }, [frame]);

    //Instant image generation, ugly, but gives insight into composition
    const handleButton0Click = () => {
        postImage(Object.assign({}, constantPayload,{
            prompt: input1,
            negative_prompt: input2,
            steps: 10,
            enable_hr: false,
            seed: inputSeed
        }));
    };

    //Test image generation, will be quick but less detailed
    const handleButton1Click = () => {
        postImage(Object.assign({}, constantPayload,{
            prompt: input1,
            negative_prompt: input2,
            steps: 30,
            enable_hr: false,
            seed: inputSeed
        }));
    };

    //Hi-Res image generation, will be a bit slow, but much more detailed
    const handleButton2Click = () => {
        postImage(Object.assign({}, constantPayload,{
            prompt: input1,
            negative_prompt: input2,
            steps: 30,
            enable_hr: true,
            seed: inputSeed
        }));
    };

    //Final image generation, will be very slow but detailed
    const handleButton3Click = () => {
        postImage(Object.assign({}, constantPayload,{
            prompt: input1,
            negative_prompt: input2,
            steps: 150,
            enable_hr: true,
            seed: inputSeed
        }));
    };

    const handleMakeInt = (value) => {
        const result = value.replace(/\D/g, '');
        setInputSeed(result);
    }

    function saveValues(updateFunction, value) {
        updateFunction(value);
    }

    function sendCallback(){
        const newFrame = Object.assign({}, frame);
        newFrame.image = imageData;
        newFrame.negative = input2;
        newFrame.positive = input1;
        newFrame.seed = inputSeed;
        callback(newFrame, frame.id);
    }

    return (
        <div className="frame-holder">
            <img
                src={`data:image/png;base64,${imageData}`}
            />
            <input
                name="Seed"
                value={inputSeed}
                onChange={(e) => saveValues(handleMakeInt, e.target.value)}
            />
            <textarea
                name="Positive Prompt"
                rows="8"
                cols="36"
                placeholder="Positive Prompt"
                value={input1}
                onChange={(e) => saveValues(setInput1, e.target.value)}
            />
            <textarea
                name="Negative Prompt"
                rows="4"
                cols="36"
                placeholder="Negative Prompt"
                value={input2}
                onChange={(e) => saveValues(setInput2, e.target.value)}
            />
            <div>
                <button onClick={handleButton0Click}><b>Instant</b></button>
                <button onClick={handleButton1Click}><b>Test</b></button>
                <button onClick={handleButton2Click}><b>Hi-Res</b></button>
                <button onClick={handleButton3Click}><b>Final</b></button>
            </div>
        </div>
    );
};


export default FrameHolder;
