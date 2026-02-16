AFRAME.registerComponent("fix-vegetation", {
    init() {
        this.el.addEventListener("model-loaded", () => {
            const obj = this.el.getObject3D("mesh");
            if (!obj) return;

            obj.traverse((node) => {
                if (node.isMesh) {
                    node.material.side = THREE.DoubleSide;
                    node.material.transparent = true;
                    node.material.alphaTest = 0.5;
                }
            });
        });
    },
});
