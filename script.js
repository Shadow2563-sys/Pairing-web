// Set backend URL to Render
const BACKEND_URL = "https://backend-for-web.onrender.com/";

// Select elements
const consoleBox = document.getElementById('console');
const getCodeBtn = document.getElementById('getCodeBtn');

// Initialize Socket.IO connection
const socket = io(BACKEND_URL);

// Function to log messages to console UI
const logToConsole = (msg) => {
    const p = document.createElement("p");
    p.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    consoleBox.appendChild(p);
    consoleBox.scrollTop = consoleBox.scrollHeight;
};

// Listen to live backend console updates
socket.on('console', (msg) => logToConsole(msg));

// Handle GET CODE button click
getCodeBtn.addEventListener("click", async () => {
    const number = document.getElementById("phoneNumber").value.trim();

    if (!number || number.length < 10) {
        alert("❌ Please enter a valid number");
        logToConsole("Invalid number entered.");
        return;
    }

    logToConsole(`Requesting pairing code for ${number}...`);
    getCodeBtn.innerText = "Processing...";
    getCodeBtn.disabled = true;

    try {
        const res = await fetch(`${BACKEND_URL}/pair`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ number })
        });

        const data = await res.json();

        if (data.code) {
            logToConsole(`✅ Pairing Code: ${data.code}`);
            alert(`Pairing Code: ${data.code}`);
        } else {
            logToConsole("Failed to retrieve code.");
        }
    } catch (err) {
        logToConsole("Error: " + err.message);
    } finally {
        getCodeBtn.innerText = "GET CODE";
        getCodeBtn.disabled = false;
    }
});

// Particle Background
particlesJS("particles-js", {
    particles: {
        number: { value: 60 },
        size: { value: 3 },
        move: { speed: 2 },
        line_linked: { enable: true, color: "#00c8ff" },
        color: { value: "#00c8ff" }
    }
});
