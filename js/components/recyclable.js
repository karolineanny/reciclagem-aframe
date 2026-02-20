AFRAME.registerComponent("recyclable", {
    schema: {
        type: { type: "string" },
        name: { type: "string" },
    },

    init() {
        this.el.setAttribute("data-type", this.data.type);
        this.el.setAttribute("data-name", this.data.name);

        const makePickable = () => {
            this.el.classList.add("pickable");
            const children = this.el.querySelectorAll("*");
            children.forEach(c => c.classList.add("pickable"));
        };

        makePickable();
        this.el.addEventListener("model-loaded", makePickable);
        this.el.addEventListener("loaded", makePickable);

        this.el.addEventListener("click", (evt) => {
            evt.stopPropagation();
            this.toggleHold(evt.detail.cursorEl);
        });
    },

    toggleHold(cursorEl) {
        const hand = document.querySelector("#hand");
        const itemZone = document.querySelector("#itemZone");
        if (!itemZone) return;

        if (GAME.held === this.el) {
            GAME.held.removeAttribute("animation__bob");
            itemZone.appendChild(GAME.held);

            GAME.held.object3D.position.set(0, 0.6, 0);
            GAME.held.object3D.rotation.set(0, 0, 0);

            const arrow = GAME.held.querySelector(".arrow");
            if (arrow) arrow.setAttribute("visible", true);

            GAME.held = null;

            const msg = document.querySelector("#msgText");
            if (msg) msg.setAttribute("value", "");
            return;
        }

        if (GAME.held) {
            return;
        }

        GAME.held = this.el;

        let parentStr = "#hand";
        let pos = { x: 0.35, y: -0.25, z: -0.8 };

        if (cursorEl && (cursorEl.getAttribute("laser-controls") || cursorEl.id.includes("Hand"))) {
            cursorEl.appendChild(this.el);
            this.el.object3D.position.set(0, 0, -0.15);
            this.el.object3D.rotation.set(-45, 0, 0);
        } else {
            hand.appendChild(this.el);
            this.el.object3D.position.set(0.35, -0.25, -0.8);
            this.el.object3D.rotation.set(0, 0.4, 0);
        }

        const arrow = this.el.querySelector(".arrow");
        if (arrow) arrow.setAttribute("visible", false);

        this.el.setAttribute("animation__bob", {
            property: "position",
            dir: "alternate",
            dur: 500,
            easing: "easeInOutSine",
            loop: true,
            to: `${this.el.object3D.position.x} ${this.el.object3D.position.y + 0.03} ${this.el.object3D.position.z}`,
        });

        const msg = document.querySelector("#msgText");
        if (msg) {
            msg.setAttribute("value", "Segurando: " + this.data.name);
            msg.setAttribute("color", "#FFF");
        }
    },
});
