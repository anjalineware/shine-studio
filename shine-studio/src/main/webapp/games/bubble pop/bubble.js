document.addEventListener("DOMContentLoaded", function () {
    const gameBoard = document.getElementById("game-board");
    const scoreElement = document.getElementById("score");
    const stopButton = document.getElementById("stop-button");
    const playAgainButton = document.getElementById("play-again-button");
    let score = 0;
    let gameInterval;

    function createBubble() {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        const maxX = window.innerWidth - 50;
        const maxY = window.innerHeight - 50;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        bubble.style.left = `${randomX}px`;
        bubble.style.top = `${randomY}px`;

        bubble.addEventListener("click", () => {
            score++;
            scoreElement.textContent = `Score: ${score}`;
            gameBoard.removeChild(bubble);
        });

        gameBoard.appendChild(bubble);
    }

    function floatBubble(bubble) {
        let floatDistance = 0;
        let floating = true;

        function float() {
            if (floating) {
                floatDistance += 2;
                bubble.style.transform = `translateY(-${floatDistance}px)`;
                requestAnimationFrame(float);
            }
        }

        float();
    }

    function startGame() {
        gameInterval = setInterval(() => {
            const bubble = createBubble();
            floatBubble(bubble);
        }, 1000);
    }

    function stopGame() {
        clearInterval(gameInterval);
        playAgainButton.style.display = "block";
        // Clear the screen by removing all bubbles
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild);
        }
    }

    function resetGame() {
        score = 0;
        scoreElement.textContent = "Score: 0";
        playAgainButton.style.display = "none";
        startGame();
    }

    stopButton.addEventListener("click", stopGame);
    playAgainButton.addEventListener("click", resetGame);

    startGame();
});
