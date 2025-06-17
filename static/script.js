function startListening() {
    const recognition = new webkitSpeechRecognition(); // or SpeechRecognition
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('question').textContent = "You: " + transcript;

        fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: transcript })
        })
        .then(res => res.blob())
        .then(blob => {
            const audioUrl = URL.createObjectURL(blob);
            const audio = document.getElementById('audio');
            audio.src = audioUrl;
            audio.play();

            // download link
            const link = document.getElementById('downloadLink');
            link.href = audioUrl;
            link.style.display = 'inline';
        });
    };

    recognition.onerror = function(event) {
        alert('Speech recognition error: ' + event.error);
    };
}
