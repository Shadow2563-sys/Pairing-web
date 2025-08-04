// script.js

document.addEventListener("DOMContentLoaded", function () {
    const getCodeBtn = document.getElementById("getCodeBtn");

    getCodeBtn.addEventListener("click", function () {
        const input = document.querySelector("input[type='text']");
        const phoneNumber = input.value.trim();

        if (!phoneNumber || phoneNumber.length < 10) {
            alert("❌ Please enter a valid number (e.g., 9476XXXXXX)");
            return;
        }

        // Simulate loading or sending request
        getCodeBtn.innerText = "Processing...";
        getCodeBtn.disabled = true;

        setTimeout(() => {
            // Replace this with backend fetch/ajax later
            alert(`✅ Pairing code sent to ${phoneNumber}`);
            getCodeBtn.innerText = "GET CODE";
            getCodeBtn.disabled = false;
        }, 2000);
    });
});
