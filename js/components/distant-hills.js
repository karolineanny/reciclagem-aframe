AFRAME.registerComponent("distant-hills", {
    schema: {
        count: { type: "int", default: 10 },
        radiusMin: { type: "number", default: 8 },
        radiusMax: { type: "number", default: 18 },
        zMin: { type: "number", default: -40 },
        zMax: { type: "number", default: -70 },
        xMin: { type: "number", default: -50 },
        xMax: { type: "number", default: 50 },
        baseY: { type: "number", default: -2.8 }
    },

    init() {
        const d = this.data;
        const rand = (a, b) => a + Math.random() * (b - a);

        for (let i = 0; i < d.count; i++) {
            const hill = document.createElement("a-sphere");
            const r = rand(d.radiusMin, d.radiusMax);

            hill.setAttribute("radius", r);
            hill.setAttribute("position", `${rand(d.xMin, d.xMax)} ${d.baseY} ${rand(d.zMax, d.zMin)}`);

            const sy = rand(0.25, 0.45);
            hill.setAttribute("scale", `1 ${sy} 1`);

            hill.setAttribute("material", "color: #1f5f3b; roughness: 1; metalness: 0;");
            hill.setAttribute("shadow", "receive: true; cast: false");
            this.el.appendChild(hill);
        }
    }
});
