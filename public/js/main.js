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


document.getElementById('lookupForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();

    const phoneNumber = document.getElementById('phoneNumber').value;

    try {
        const response = await fetch('/lookup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber })
        });

        const result = await response.json();

        if (result.error) {
            document.getElementById('lookupResult').innerHTML = `<h4>Error:</h4><pre>${result.error}</pre>`;
        } else {
            const data = result.data;

            document.getElementById('lookupResult').innerHTML = `
                <h4>Lookup Result:</h4>
                <dl class="list carrier-result-list">
                    <dt class="carrier-label">Country Code</dt>
                    <dd class="carrier-value">${data.country_code}</dd>
                    <dt class="carrier-label">Phone Number</dt>
                    <dd class="carrier-value">${data.phone_number}</dd>
                    <dt class="carrier-label">National Format</dt>
                    <dd class="carrier-value">${data.national_format}</dd>
                    <dt class="carrier-label">CNAM</dt>
                    <dd class="carrier-value">${data.caller_name}</dd>
                    <dt class="carrier-label">Carrier Name</dt>
                    <dd class="carrier-value">${data.carrier.name}</dd>
                    <dt class="carrier-label">Mobile Country Code</dt>
                    <dd class="carrier-value">${data.carrier.mobile_country_code}</dd>
                    <dt class="carrier-label">Mobile Network Code</dt>
                    <dd class="carrier-value">${data.carrier.mobile_network_code}</dd>
                    <dt class="carrier-label">Type</dt>
                    <dd class="carrier-value">${data.carrier.type}</dd>
                    <dt class="carrier-label">Error Code</dt>
                    <dd class="carrier-value">${data.carrier.error_code ?? 'None'}</dd>
                    <dt class="carrier-label">URL</dt>
                    <dd class="carrier-value"><a href="${data.url}" target="_blank">${data.url}</a></dd>
                </dl>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('lookupResult').innerHTML = `<h4>Error:</h4><pre>${error.message}</pre>`;
    }
});
