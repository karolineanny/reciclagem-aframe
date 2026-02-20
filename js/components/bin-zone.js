AFRAME.registerComponent("bin-zone", {
    schema: {
        accepts: { type: "string" },
        label: { type: "string" },
    },

    init() {
        this.tick = AFRAME.utils.throttleTick(this.tick, 100, this);

        const makeClickable = () => {
            this.el.classList.add("clickable");
            const children = this.el.querySelectorAll("*");
            children.forEach(c => c.classList.add("clickable"));
        };
        makeClickable();
        this.el.addEventListener("model-loaded", makeClickable);
        this.el.addEventListener("loaded", makeClickable);

        this.el.addEventListener("click", () => {
            if (GAME.held) {
                this.attemptDrop(GAME.held);
            } else {
                const msg = document.querySelector("#msgText");
                if (msg) {
                    msg.setAttribute("value", "Pegue um objeto primeiro!");
                    msg.setAttribute("color", "#F00");
                    setTimeout(() => msg.setAttribute("value", ""), 2000);
                }
            }
        });
    },

    tick() {
        if (!GAME.held) return;

        const held = GAME.held;
        const heldWorldPos = new THREE.Vector3();
        held.object3D.getWorldPosition(heldWorldPos);

        const binWorldPos = new THREE.Vector3();
        this.el.object3D.getWorldPosition(binWorldPos);

        const dist = heldWorldPos.distanceTo(binWorldPos);

        if (dist < 0.9) {
            this.attemptDrop(held);
        }
    },

    attemptDrop(held) {
        if (held.isDropping) return;
        held.isDropping = true;

        const itemType = held.getAttribute("data-type");
        const itemName = held.getAttribute("data-name");
        const msg = document.querySelector("#msgText");

        GAME.tries += 1;

        if (itemType === this.data.accepts) {
            GAME.score += 10;
            flashBin(this.el, true);
            if (msg) {
                msg.setAttribute("value", "Sucesso! " + itemName + " descartado corretamente.");
                msg.setAttribute("color", "#0F0");
            }
        } else {
            GAME.score -= 5;
            flashBin(this.el, false);
            if (msg) {
                msg.setAttribute("value", "Errado! " + itemName + " nao e aqui.");
                msg.setAttribute("color", "#F00");
            }
        }

        if (msg) setTimeout(() => msg.setAttribute("value", ""), 2000);

        held.remove();
        GAME.held = null;
        GAME.recycledCount++;

        if (GAME.recycledCount >= GAME.totalItems) {
            setTimeout(showGameOver, 1000);
        }
    },
});
