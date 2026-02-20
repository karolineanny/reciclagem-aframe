AFRAME.registerComponent("game-manager", {
    init() {
        const scene = this.el;

        scene.addEventListener("game-start", () => {
            scene.canvas && scene.canvas.focus();
        });
    },
});
