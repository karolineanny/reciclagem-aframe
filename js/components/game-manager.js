AFRAME.registerComponent("game-manager", {
    init() {
        const scene = this.el;
        const intro = document.querySelector("#intro");
        const btnStart = document.querySelector("#btnStart");
        const btnRestart = document.querySelector("#btnRestart");

        btnStart.addEventListener("click", () => {
            intro.style.display = "none";
            scene.emit("game-start");
            scene.canvas && scene.canvas.focus();
        });

        if (btnRestart) {
            btnRestart.addEventListener("click", () => {
                window.location.reload();
            });
        }

    },
});
