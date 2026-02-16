AFRAME.registerComponent("reset-game", {
    init() {
        this.el.addEventListener("click", () => window.location.reload());
    },
});
