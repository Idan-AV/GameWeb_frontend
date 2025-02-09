
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    const registerBtn = document.getElementById("registerBtn");
    const loginBtn = document.getElementById("loginBtn");
    const loanedGamesBtn = document.getElementById("loanedGamesBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const addGameBtn = document.getElementById("addGameBtn"); // Get the Add Game button

    if (user) {
        // If user is logged in, show Loaned Games and Logout, hide Register and Login
        registerBtn.style.display = "none";
        loginBtn.style.display = "none";
        loanedGamesBtn.style.display = "inline-block";
        logoutBtn.style.display = "inline-block";

        // If user is an admin (role = 1), show Add Game button
        if (user.role === 1) {
            addGameBtn.style.display = "inline-block";
        }
    } else {
        // If user is not logged in, show Register and Login, hide Loaned Games, Logout, and Add Game
        registerBtn.style.display = "inline-block";
        loginBtn.style.display = "inline-block";
        loanedGamesBtn.style.display = "none";
        logoutBtn.style.display = "none";
        addGameBtn.style.display = "none";
    }
});

function logout() {
    localStorage.removeItem("user");
    window.location.reload();
}

function viewLoanedGames() {
    window.location.href = "loaned_games.html"; // Update with actual loaned games page
}




async function getGames() {
    try {
        const response = await axios.get("http://127.0.0.1:5000/games");
        const gamesList = document.getElementById('gamesList');
        gamesList.innerHTML = ''; // Clear existing list

        response.data.games.forEach(game => {
            gamesList.innerHTML += `  <!-- Changed booksList to gamesList -->
                <div class="game-card">
                    <h3>${game.title}</h3>
                    <p>Genre: ${game.genre}</p>
                    <p>Price: ${game.price}</p>
                    <p>Quantity: ${game.quantity}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching games:', error);
        alert('Failed to load games');
    }
}




// Load all books when page loads
document.addEventListener('DOMContentLoaded', getGames);