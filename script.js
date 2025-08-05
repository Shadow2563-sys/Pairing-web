const BACKEND_URL = "https://backend-for-web.onrender.com";
const socket = io(BACKEND_URL);
const consoleBox = document.getElementById('console');
const getCodeBtn = document.getElementById('getCodeBtn');
const phoneInput = document.getElementById('phoneNumber');
const connectionStatus = document.getElementById('connectionStatus');

// Console logger
const logToConsole = (msg) => {
    const p = document.createElement("p");
    p.textContent = msg;
    
    if (msg.includes('🟢')) p.style.color = '#00ff00';
    else if (msg.includes('🔴')) p.style.color = '#ff0000';
    else if (msg.includes('↻')) p.style.color = '#ffff00';
    else if (msg.includes('❌')) p.style.color = '#ff3333';
    else if (msg.includes('✅')) p.style.color = '#00ccff';
    else p.style.color = '#00ffcc';
    
    consoleBox.appendChild(p);
    consoleBox.scrollTop = consoleBox.scrollHeight;
};

// Connection status
socket.on('connection-status', (isConnected) => {
    connectionStatus.style.backgroundColor = isConnected ? '#00ff00' : '#ff0000';
    connectionStatus.title = isConnected ? 'Connected' : 'Disconnected';
});

socket.on('console', logToConsole);

// Get pairing code
getCodeBtn.addEventListener("click", async () => {
    const number = phoneInput.value.trim();

    if (!/^234\d{10}$/.test(number)) {
        alert("❌ Please enter a valid Nigerian number\nFormat: 234XXXXXXXXXX");
        phoneInput.classList.add('error');
        setTimeout(() => phoneInput.classList.remove('error'), 1000);
        return;
    }

    logToConsole(`Requesting pairing code for ${number}...`);
    getCodeBtn.disabled = true;
    getCodeBtn.innerHTML = '<div class="spinner"></div>';

    try {
        const response = await fetch(`${BACKEND_URL}/pair`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ number })
        });

        const data = await response.json();

        if (data.success) {
            logToConsole(`✅ Pairing Code: ${data.code}`);
            await navigator.clipboard.writeText(data.code);
            alert(`Pairing Code: ${data.code}\n\n(Copied to clipboard)`);
        } else {
            throw new Error(data.error || 'Failed to get code');
        }
    } catch (err) {
        logToConsole(`❌ Error: ${err.message}`);
        alert(`Error: ${err.message}`);
    } finally {
        getCodeBtn.disabled = false;
        getCodeBtn.textContent = 'GET CODE';
    }
});

// Particles.js
particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        color: { value: "#00c8ff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: { enable: true, distance: 150, color: "#00c8ff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2 }
    }
});
