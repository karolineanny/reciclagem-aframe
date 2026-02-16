const GAME = {
    held: null,
    score: 0,
    tries: 0,
    recycledCount: 0,
    totalItems: 4
};

function showGameOver() {
    const gameOverScreen = document.getElementById("gameOver");
    const finalScoreEl = document.getElementById("finalScore");
    const titleEl = document.getElementById("gameOverTitle");

    if (gameOverScreen && finalScoreEl && titleEl) {
        gameOverScreen.style.display = "flex";
        finalScoreEl.innerText = "Pontuação Final: " + GAME.score;

        if (GAME.score >= 40) {
            titleEl.innerText = "Parabéns! Você é um mestre da reciclagem! 🌟";
            titleEl.style.color = "#4ade80";
        } else if (GAME.score > 0) {
            titleEl.innerText = "Bom trabalho! Mas dá para melhorar. 👍";
            titleEl.style.color = "#facc15";
        } else {
            titleEl.innerText = "Que pena! Tente reciclar corretamente na próxima. ⚠️";
            titleEl.style.color = "#ef4444";
        }
    }
}

function flashBin(binEl, ok) {
    const body = binEl.querySelector(".binBody");
    if (!body) return;

    const original = body.getAttribute("material").color;
    body.setAttribute("material", "color", ok ? "#19c37d" : "#ef4444");

    setTimeout(() => body.setAttribute("material", "color", original), 250);
}
