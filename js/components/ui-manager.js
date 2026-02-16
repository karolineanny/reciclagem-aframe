AFRAME.registerComponent("ui-manager", {
    init() {
        this.introPanel = document.querySelector("#introUsingVR");
        this.gameOverPanel = document.querySelector("#gameOverUsingVR");

        // Hide game over initially
        if (this.gameOverPanel) {
            this.gameOverPanel.setAttribute("visible", false);
            // Move out of way
            this.gameOverPanel.setAttribute("position", "0 -10 0");
        }

        // Setup Start interaction
        const startBtn = document.querySelector("#startBtn3D");
        if (startBtn) {
            startBtn.addEventListener("click", () => {
                if (this.introPanel) {
                    this.introPanel.setAttribute("visible", false);
                    this.introPanel.setAttribute("position", "0 -10 0");
                }

                // Emit game start on scene
                this.el.sceneEl.emit("game-start");
            });
        }

        // Setup Restart interaction
        const restartBtn = document.querySelector("#restartBtn3D");
        if (restartBtn) {
            restartBtn.addEventListener("click", () => {
                window.location.reload();
            });
        }
    },

    showGameOver(score) {
        if (!this.gameOverPanel) return;

        // Reset position to be visible in front of camera
        // In VR, better to parent to camera or just place at known location
        // We'll place it at fixed world coordinates for now, assuming player is near origin

        const camera = document.querySelector("#camera");
        const rig = document.querySelector("#rig");

        // Simple approach: Place 2m in front of current rig position
        const pos = rig.getAttribute("position");
        // We just reset it to origin + offset
        this.gameOverPanel.setAttribute("position", `0 5.0 -2.5`);
        this.gameOverPanel.setAttribute("visible", true);

        // Update Text
        const scoreText = document.querySelector("#scoreText3D");
        if (scoreText) scoreText.setAttribute("value", `Pontuacao: ${score}`);

        const titleText = document.querySelector("#titleText3D");
        if (titleText) {
            if (score >= 40) {
                titleText.setAttribute("value", "Mestre da Reciclagem!");
                titleText.setAttribute("color", "#4ade80");
            } else if (score > 0) {
                titleText.setAttribute("value", "Bom trabalho!");
                titleText.setAttribute("color", "#facc15");
            } else {
                titleText.setAttribute("value", "Tente novamente!");
                titleText.setAttribute("color", "#ef4444");
            }
        }
    }
});
