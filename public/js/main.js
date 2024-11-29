// Placeholder JavaScript
console.log("JavaScript file loaded.");

/* -------------------------------
   Handle POST request for name form
-------------------------------- */
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

/* -------------------------------
   Handle POST request for Whisper transcription
-------------------------------- */
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

/* -------------------------------
   Clipboard and Clear Functions
-------------------------------- */
// Copy transcription text to clipboard
function copyToClipboard(event) {
    event.preventDefault();
    const transcriptionText = document.getElementById('transcription-text').textContent;
    navigator.clipboard.writeText(transcriptionText)
        .then(() => {
            console.log('Copied to clipboard successfully!');
        })
        .catch((err) => {
            console.error('Failed to copy text:', err);
            alert('Failed to copy text to clipboard. Please try again.');
        });
}

// Clear the transcription result
function clearTranscription(event) {
    event.preventDefault();
    document.getElementById('transcription-text').textContent = '';
    document.getElementById('transcription-result').style.display = 'none';
}

/* -------------------------------
   Handle POST request for Lookup form
-------------------------------- */
document.getElementById('lookupForm')?.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const phoneNumber = document.getElementById('phoneNumber').value;

    try {
        const response = await fetch('/lookup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber }),
        });

        const result = await response.json();

        if (result.error) {
            document.getElementById('lookupResult').innerHTML = `<h4>Error:</h4><pre>${result.error}</pre>`;
        } else {
            document.getElementById('lookupResult').innerHTML = `
            <h4>Lookup Result:</h4>
            <ul class="list">
    <li>Carrier: ${JSON.stringify(result.data.carrier.name, null, 2)}</li>
    <li>Number type: ${JSON.stringify(result.data.carrier.type, null, 2)}</li>
    <li>Country: ${JSON.stringify(result.data.countryCode, null, 2)}</li>
    <li>Mobile country code: ${JSON.stringify(result.data.carrier.mobile_country_code, null, 2)}</li>
    <li>Mobile network code: ${JSON.stringify(result.data.carrier.mobile_network_code, null, 2)}</li>
</ul>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('lookupResult').innerHTML = `<h4>Error:</h4><pre>${error.message}</pre>`;
    }
});
