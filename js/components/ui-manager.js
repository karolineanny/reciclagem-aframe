AFRAME.registerComponent("ui-manager", {
    init() {
        this.introPanel = document.querySelector("#introUsingVR");
        this.gameOverPanel = document.querySelector("#gameOverUsingVR");

        if (this.gameOverPanel) {
            this.gameOverPanel.setAttribute("visible", false);
            this.gameOverPanel.setAttribute("position", "0 -10 0");
        }

        const startBtn = document.querySelector("#startBtn3D");
        if (startBtn) {
            startBtn.addEventListener("click", () => {
                if (this.introPanel) {
                    this.introPanel.setAttribute("visible", false);
                    this.introPanel.setAttribute("position", "0 -10 0");
                }

                this.el.sceneEl.emit("game-start");
            });
        }

        const restartBtn = document.querySelector("#restartBtn3D");
        if (restartBtn) {
            restartBtn.addEventListener("click", () => {
                window.location.reload();
            });
        }
    },

    showGameOver(score) {
        if (!this.gameOverPanel) return;


        const camera = document.querySelector("#camera");
        const rig = document.querySelector("#rig");

        const pos = rig.getAttribute("position");
        this.gameOverPanel.setAttribute("position", `0 5.0 -2.5`);
        this.gameOverPanel.setAttribute("visible", true);

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
