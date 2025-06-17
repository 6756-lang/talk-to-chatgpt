function askQuestion() {
    const userInput = document.getElementById("userInput").value;
    document.getElementById("question").innerText = "You: " + userInput;
    fetch("/ask", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({question: userInput})
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("response").innerText = "ChatGPT: " + data.answer;
        const audio = document.getElementById("audio");
        audio.src = data.audio_url;
        audio.load();
        audio.play();

        const downloadLink = document.getElementById("downloadLink");
        downloadLink.href = data.audio_url;
        downloadLink.style.display = "inline";
    });
}
