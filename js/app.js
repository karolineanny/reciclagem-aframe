const GAME = {
    held: null,
    score: 0,
    tries: 0,
    recycledCount: 0,
    totalItems: 4
};

function showGameOver() {
    const scene = document.querySelector("a-scene");
    const uiManager = scene ? scene.components["ui-manager"] : null;

    if (uiManager) {
        uiManager.showGameOver(GAME.score);
    }
}

function flashBin(binEl, ok) {
    const body = binEl.querySelector(".binBody");
    if (!body) return;

    const original = body.getAttribute("material").color;
    body.setAttribute("material", "color", ok ? "#19c37d" : "#ef4444");

    setTimeout(() => body.setAttribute("material", "color", original), 250);
}
