import React, { useRef } from 'react';

function LoadButton({ onFileRead }) {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    onFileRead(jsonData);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            };

            reader.readAsText(file);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="Inline">
            <input
                name=""
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <button onClick={openFileDialog}>
                <b>Load</b>
            </button>
        </div>
    );
}

export default LoadButton;