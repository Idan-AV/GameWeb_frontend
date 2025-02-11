document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    // if (!user) {
    //     alert("You must be logged in to loan a game.");
    //     window.location.href = "login.html"; // Redirect if not logged in
    //     return;
    // }

    async function fetchGames() {
        try {
            const response = await axios.get("http://127.0.0.1:5000/games");
            const gamesList = document.getElementById("gamesList");
            gamesList.innerHTML = ""; // Clear existing list

            response.data.games.forEach(game => {
                const gameButton = document.createElement("button");
                gameButton.classList.add("game-button");
                gameButton.innerHTML = `
                    <h3>${game.title}</h3>
                    <p>Genre: ${game.genre}</p>
                    <p>Price: ${game.price}</p>
                    <p>Quantity: ${game.quantity}</p>
                `;

                gameButton.onclick = () => loanGame(game.id);

                gamesList.appendChild(gameButton);
            });
        } catch (error) {
            console.error("Error fetching games:", error);
            alert("Failed to load games.");
        }
    }

    window.loanGame = async function (gameId) {
        try {
            await axios.post("http://127.0.0.1:5000/loans", {
                user_id: user.id,
                game_id: gameId
            });

            alert("Game loaned successfully!");
            window.location.href = "index.html"; // Redirect to home
        } catch (error) {
            if (error.response) {
                // If the server responded with a message, show it in an alert
                alert(error.response.data.message);
            } else {
                // General error handling
                console.error("Error loaning game:", error);
                alert("Failed to loan the game.");
            }
        }
    };

    fetchGames();
});
