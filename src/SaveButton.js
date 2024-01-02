import React from 'react';

function SaveButton({ frames }) {
    const saveToFile = () => {
        const jsonString = JSON.stringify(frames, null, 2); // Convert array to JSON string with indentation

        // Create a Blob containing the JSON data
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sequence.json'; // Specify the filename

        // Append the link to the document and trigger a click
        document.body.appendChild(link);
        link.click();

        // Remove the link and revoke the Blob URL
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <button onClick={saveToFile}>
            <b>Save</b>
        </button>
    );
}

export default SaveButton;