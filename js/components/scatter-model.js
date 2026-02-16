AFRAME.registerComponent("scatter-model", {
    schema: {
        model: { type: "string" },
        count: { type: "int", default: 10 },
        areaX: { type: "number", default: 30 },
        areaZ: { type: "number", default: 30 },

        groundY: { type: "number", default: 0 },
        extraOffset: { type: "number", default: 0 },

        minScale: { type: "number", default: 1 },
        maxScale: { type: "number", default: 1 },
    },

    init() {
        const d = this.data;
        if (!d.model) return;

        for (let i = 0; i < d.count; i++) {
            const el = document.createElement("a-entity");
            el.setAttribute("gltf-model", d.model);

            const x = (Math.random() - 0.5) * d.areaX;
            const z = (Math.random() - 0.5) * d.areaZ;

            const s = d.minScale + Math.random() * (d.maxScale - d.minScale);
            const ry = Math.random() * 360;

            el.setAttribute("position", `${x} ${d.groundY} ${z}`);
            el.setAttribute("rotation", `0 ${ry} 0`);
            el.setAttribute("scale", `${s} ${s} ${s}`);

            el.setAttribute("ground-align", `groundY: ${d.groundY}; extraOffset: ${d.extraOffset}; once: true`);

            this.el.appendChild(el);
        }
    },
});
