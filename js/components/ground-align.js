AFRAME.registerComponent("ground-align", {
    schema: {
        groundY: { type: "number", default: 0 },
        extraOffset: { type: "number", default: 0 },
        once: { type: "boolean", default: true }
    },

    init() {
        this._done = false;

        this.el.addEventListener("model-loaded", () => {
            if (this.data.once && this._done) return;

            const mesh = this.el.getObject3D("mesh");
            if (!mesh) return;

            const box = new THREE.Box3().setFromObject(mesh);
            const minY = box.min.y;

            const lift = (-minY) + this.data.extraOffset;
            const pos = this.el.getAttribute("position") || { x: 0, y: 0, z: 0 };
            this.el.setAttribute("position", `${pos.x} ${this.data.groundY + lift} ${pos.z}`);

            this._done = true;
        });
    }
});
