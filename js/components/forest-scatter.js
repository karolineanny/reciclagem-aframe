AFRAME.registerComponent("forest-scatter", {
    schema: {
        count: { type: "int", default: 150 },
        radiusMin: { type: "number", default: 18 },
        radiusMax: { type: "number", default: 45 },
        groundY: { type: "number", default: 0 },
    },

    init() {
        const d = this.data;
        const rand = (min, max) => min + Math.random() * (max - min);

        const makeTree = (x, z, scale) => {
            const tree = document.createElement("a-entity");
            tree.setAttribute("position", `${x} ${d.groundY} ${z}`);
            tree.setAttribute("rotation", `0 ${Math.random() * 360} 0`);
            tree.setAttribute("scale", `${scale} ${scale} ${scale}`);

            const trunk = document.createElement("a-cylinder");
            trunk.setAttribute("height", "1.8");
            trunk.setAttribute("radius", "0.18");
            trunk.setAttribute("position", "0 0.9 0");
            trunk.setAttribute("material", "color: #5b3a29; roughness: 1; metalness: 0;");
            trunk.setAttribute("shadow", "cast: true");

            const crown = document.createElement("a-cone");
            crown.setAttribute("height", "2.6");
            crown.setAttribute("radius-bottom", "1.25");
            crown.setAttribute("radius-top", "0.1");
            crown.setAttribute("position", "0 2.6 0");
            crown.setAttribute("material", "color: #14532d; roughness: 1; metalness: 0;");
            crown.setAttribute("shadow", "cast: true");

            const crown2 = document.createElement("a-cone");
            crown2.setAttribute("height", "2.0");
            crown2.setAttribute("radius-bottom", "1.05");
            crown2.setAttribute("radius-top", "0.1");
            crown2.setAttribute("position", "0 3.5 0");
            crown2.setAttribute("material", "color: #166534; roughness: 1; metalness: 0;");
            crown2.setAttribute("shadow", "cast: true");

            tree.appendChild(trunk);
            tree.appendChild(crown);
            tree.appendChild(crown2);

            this.el.appendChild(tree);
        };

        for (let i = 0; i < d.count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = rand(d.radiusMin, d.radiusMax);

            const x = Math.cos(angle) * dist;
            const z = Math.sin(angle) * dist;

            const s = rand(1.2, 2.8);
            makeTree(x, z, s);
        }
    }
});
