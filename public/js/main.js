// Placeholder JavaScript
console.log("JavaScript file loaded.");

// Handle GET request demonstration
document.getElementById('nameForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('nameInput').value;

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: nameInput }),
        });

        const data = await response.json();

        // Update response elements
        document.getElementById('responseMessage').innerHTML = `<p>${data.message}</p>`;
        document.getElementById('jsonResponse').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error:', error);
    }
});

// Handle POST request for Whisper transcription
document.getElementById('transcription-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const response = await fetch('/transcribe', {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();

        if (result.transcription) {
            document.getElementById('transcription-text').textContent = result.transcription;
            document.getElementById('download-link').href = `/download-transcription/${result.fileName}`;
            document.getElementById('transcription-result').style.display = 'block';
        } else {
            document.getElementById('transcription-text').textContent = 'Transcription failed. Please try again.';
            document.getElementById('transcription-result').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('transcription-text').textContent = 'An error occurred. Please try again later.';
        document.getElementById('transcription-result').style.display = 'block';
    }
});

// Function to copy transcription text to clipboard
function copyToClipboard(event) {
    event.preventDefault();
    const transcriptionText = document.getElementById('transcription-text').textContent;
    navigator.clipboard.writeText(transcriptionText).catch((err) => {
        console.error('Failed to copy text:', err);
    });
}

// Function to clear the transcription result
function clearTranscription(event) {
    event.preventDefault();
    document.getElementById('transcription-text').textContent = '';
    document.getElementById('transcription-result').style.display = 'none';
}
