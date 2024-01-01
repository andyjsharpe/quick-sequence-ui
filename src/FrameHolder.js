// FrameHolder.js
import React, { useState } from "react";
import "./FrameHolder.css";

async function postImage(data, imageUpdateFunction) {
    const response = await fetch("http://127.0.0.1:7860/sdapi/v1/txt2img", {
            mode: 'cors',
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => imageUpdateFunction(data.images[0]))
            .catch(error => console.error(error));
}

const FrameHolder = () => {
    const [imageData, setImageData] = useState(null);
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    //Test image generation, will be quick but less detailed
    const handleButton1Click = () => {
        postImage({
            prompt: input1,
            negative_prompt: input2,
            steps: 40,
            enable_hr: false
        }, setImageData);
    };

    //Final image generation, will be very slow but detailed
    const handleButton2Click = () => {
        postImage({
            prompt: input1,
            negative_prompt: input2,
            steps: 150,
            enable_hr: true
        });
    };

    return (
        <div className="frame-holder">
            <img src={`data:image/png;base64,${imageData}`} />
            <input
                name="Positive Prompt"
                type="text"
                placeholder="Positive Prompt"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
            />
            <input
                name="Negative Prompt"
                type="text"
                placeholder="Negative Prompt"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
            />
            <button onClick={handleButton1Click}>Test Generation</button>
            <button onClick={handleButton2Click}>Final Generation</button>
        </div>
    );
};


export default FrameHolder;
