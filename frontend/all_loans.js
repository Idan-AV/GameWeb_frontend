document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    

    if (user.role === 1) {
        async function getLoans() {
            try {
                const response = await axios.get("http://127.0.0.1:5000/loans");
                const gamesList = document.getElementById('gamesList');
                gamesList.innerHTML = ''; // Clear existing list

                response.data.loans.forEach(game => {
                    gamesList.innerHTML += `  
                        <div class="game-card">
                            <h3>${game.title}</h3>
                            <p>Genre: ${game.genre}</p>
                            <p>Price: ${game.price}</p>
                            <p>User name: ${game.user_name}</p>
                        </div>
                    `;
                });
            } catch (error) {
                console.error('Error fetching loans:', error);
                alert('Failed to load loans');
            }
        }
        getLoans(); // Call the function for admins
    } else {
        async function getLoansForCustomer() {
            try {
                console.log(`user id:${user.id}`);
                const response = await axios.get(`http://127.0.0.1:5000/loans_for_customer/${user.id}`
                  
                );

                const gamesList = document.getElementById('gamesList');
                gamesList.innerHTML = ''; // Clear existing list

                response.data.games.forEach(game => {
                    gamesList.innerHTML += `  
                        <div class="game-card">
                            <h3>${game.title}</h3>
                            <p>Genre: ${game.genre}</p>
                            <p>Price: ${game.price}</p>
                        </div>
                    `;
                });
            } catch (error) {
                console.error('Error fetching loans:', error);
                alert('Failed to load loans');
            }
        }
        getLoansForCustomer(); // Call the function for normal users
    }
});
