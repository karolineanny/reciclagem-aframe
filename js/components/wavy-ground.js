AFRAME.registerComponent("wavy-ground", {
    schema: {
        amp: { type: "number", default: 0.35 },
        freq: { type: "number", default: 0.25 },
        amp2: { type: "number", default: 0.18 },
        freq2: { type: "number", default: 0.75 },
        seed: { type: "number", default: 7 },
    },

    init() {
        const apply = () => {
            const mesh = this.el.getObject3D("mesh");
            if (!mesh || !mesh.geometry) return;

            const geom = mesh.geometry;
            if (!geom.attributes || !geom.attributes.position) return;

            const pos = geom.attributes.position;
            const { amp, freq, amp2, freq2, seed } = this.data;

            for (let i = 0; i < pos.count; i++) {
                const x = pos.getX(i);
                const z = pos.getY(i);

                const y1 = Math.sin((x + seed) * freq) * amp;
                const y2 = Math.cos((z - seed) * freq) * amp * 0.9;
                const y3 = Math.sin((x * 0.6 + z * 0.9 + seed) * freq2) * amp2;

                const r = Math.sqrt(x * x + z * z);
                const flatten = Math.max(0, 1 - (r / 10));
                const y = (y1 + y2 + y3) * (1 - flatten);

                pos.setZ(i, y);
            }

            pos.needsUpdate = true;
            geom.computeVertexNormals();
        };

        this.el.addEventListener("object3dset", (e) => {
            if (e.detail.type === "mesh") apply();
        });

        this.el.addEventListener("loaded", apply);
    }
});
