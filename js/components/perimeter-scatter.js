AFRAME.registerComponent("perimeter-scatter", {
    schema: {
        model: { type: "string" },
        countPerSide: { type: "int", default: 8 },
        width: { type: "number", default: 30 },
        depth: { type: "number", default: 30 },
        groundY: { type: "number", default: 0 },
        extraOffset: { type: "number", default: 0 },
        skipFront: { type: "boolean", default: true }
    },

    init() {
        const d = this.data;
        if (!d.model) return;

        const halfW = d.width / 2;
        const halfD = d.depth / 2;

        const createBush = (x, z, ry) => {
            const el = document.createElement("a-entity");
            el.setAttribute("gltf-model", d.model);
            el.setAttribute("position", `${x} ${d.groundY} ${z}`);
            el.setAttribute("rotation", `0 ${ry} 0`);

            const s = 2.2;
            el.setAttribute("scale", `${s} ${s} ${s}`);

            el.setAttribute("ground-align", `groundY: ${d.groundY}; extraOffset: ${d.extraOffset}; once: true`);
            el.setAttribute("fix-vegetation", "");

            this.el.appendChild(el);
        };

        const sides = [];
        sides.push({ z: -halfD, xStart: -halfW, xEnd: halfW, var: 'x' }); // BACK
        sides.push({ x: -halfW, zStart: -halfD, zEnd: halfD, var: 'z' }); // LEFT
        sides.push({ x: halfW, zStart: -halfD, zEnd: halfD, var: 'z' });  // RIGHT

        if (!d.skipFront) sides.push({ z: halfD, xStart: -halfW, xEnd: halfW, var: 'x' }); // FRONT

        sides.forEach(side => {
            for (let i = 0; i < d.countPerSide; i++) {
                const t = i / (d.countPerSide - 1);
                let posX = 0, posZ = 0;

                if (side.var === 'x') {
                    posZ = side.z;
                    posX = side.xStart + (side.xEnd - side.xStart) * t;
                } else {
                    posX = side.x;
                    posZ = side.zStart + (side.zEnd - side.zStart) * t;
                }

                const ry = (side.var === 'x') ? 0 : 90;
                createBush(posX, posZ, ry);
            }
        });
    }
});
