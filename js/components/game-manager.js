AFRAME.registerComponent("game-manager", {
    init() {
        const scene = this.el;

        // UI logic is now handled by ui-manager.js
        // We can keep this component for other game management tasks if needed
        // For now, it just listens for the game-start event to focus canvas

        scene.addEventListener("game-start", () => {
            scene.canvas && scene.canvas.focus();
        });
    },
});
