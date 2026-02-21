AFRAME.registerComponent('thumbstick-movement', {
    schema: {
        speed: { default: 5 },
        rigId: { default: '#rig' },
        cameraCenterId: { default: '#camera' }
    },

    init: function () {
        this.axis = [0, 0];
        this.direction = new THREE.Vector3();

        this.el.addEventListener('axismove', this.onAxisMove.bind(this));
    },

    onAxisMove: function (evt) {
        const d = evt.detail;
        if (d.axis.length >= 4) {
            this.axis[0] = d.axis[2];
            this.axis[1] = d.axis[3];
        } else if (d.axis.length >= 2) {
            this.axis[0] = d.axis[0];
            this.axis[1] = d.axis[1];
        }

        if (Math.abs(this.axis[0]) < 0.1) this.axis[0] = 0;
        if (Math.abs(this.axis[1]) < 0.1) this.axis[1] = 0;
    },

    tick: function (time, delta) {
        if (!this.axis[0] && !this.axis[1]) return;

        const rig = document.querySelector(this.data.rigId);
        const camera = document.querySelector(this.data.cameraCenterId);

        if (!rig || !camera) return;

        const cameraRotation = camera.object3D.rotation.y;

        this.direction.set(this.axis[0], 0, this.axis[1]);

        this.direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraRotation);

        const moveSpeed = (this.data.speed * delta) / 1000;

        rig.object3D.position.addScaledVector(this.direction, moveSpeed);
    }
});
