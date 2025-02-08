document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post("http://127.0.0.1:5000/login", {
            phone_number: phone,
            password: password
        });

        if (response.data.error) {
            alert("Login failed: " + response.data.error);
        } else {
            // Save user info in local storage
            localStorage.setItem("user", JSON.stringify(response.data.user));

            alert("Login successful!");
            window.location.href = "index.html"; // Redirect after login
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Login failed. Please try again.");
    }
});

// Function to check if user is already logged in
function checkLogin() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        alert(`Welcome back, ${user.name}!`);
        window.location.href = "dashboard.html"; // Redirect if already logged in
    }
}

// Call checkLogin on page load
document.addEventListener("DOMContentLoaded", checkLogin);
