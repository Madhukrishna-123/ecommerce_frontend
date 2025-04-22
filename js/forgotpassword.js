
const API_BASE_URL = "http://localhost:8080/api/users";

// Centralized Error Display
function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// ✅ Send OTP
async function sendOtp() {
    const email = document.getElementById('email').value;
    if (!email) {
        showError('error-message', "Email is required!");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        document.getElementById("otp-section").style.display = "block";
        document.getElementById("email-section").style.display = "none";
        alert("OTP sent to your registered email!");
    } catch (error) {
        showError('error-message', error.message);
    }
}

// ✅ Verify OTP
async function verifyOtp() {
    const email = document.getElementById('email').value;
    const otp = document.getElementById('otp').value;

    if (!otp) {
        showError('otp-error-message', "OTP is required!");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/verify-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        document.getElementById("reset-section").style.display = "block";
        document.getElementById("otp-section").style.display = "none";
        alert("OTP verified successfully!");
    } catch (error) {
        showError('otp-error-message', error.message);
    }
}

// ✅ Reset Password
async function resetPassword() {
    const email = document.getElementById('email').value;
    const otp = document.getElementById('otp').value;
    const newPassword = document.getElementById('new-password').value;

    if (!newPassword) {
        showError('reset-error-message', "New Password is required!");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp, newPassword }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        alert("Password reset successfully!");
        window.location.href = "login.html"; // Redirect to login page
    } catch (error) {
        showError('reset-error-message', error.message);
    }
}
