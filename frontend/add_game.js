async function addGame() {
    const title = document.getElementById('game-title').value;
    const genre = document.getElementById('game-genre').value;
    const price = document.getElementById('game-price').value;
    const quantity = document.getElementById('game-quantity').value;

    if (!title || !genre || !price || !quantity) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        await axios.post('http://127.0.0.1:5000/games', {
            title: title,
            genre: genre,
            price: price,
            quantity: quantity
        });

        alert('Game added successfully!');

        // Redirect to home page after success
        window.location.href = 'index.html';

    } catch (error) {
        console.error('Error adding game:', error);
        alert('Failed to add a game');
    }
}
