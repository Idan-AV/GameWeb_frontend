async function register() {
    const name = document.getElementById("name").value;
    const phone_number = document.getElementById("phone_number").value;
    const city = document.getElementById("city").value;
    const age = document.getElementById("age").value;
    const password = document.getElementById("password").value;

    if (!name || !phone_number || !city || !age || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const userData = {
        name,
        phone_number,
        city,
        age,
        password
    };

    try {
        const response = await axios.post("http://127.0.0.1:5000/register", userData);

        if (response.status === 201) {
            alert("Registration successful! Redirecting to login...");
            localStorage.setItem("user", JSON.stringify(response.data));
            window.location.href = "login.html";
        } else {
            alert("Registration failed.");
        }
    } catch (error) {
        console.error("Error registering:", error);
        alert("Registration error: " + (error.response?.data?.message || "Server error"));
    }
}
