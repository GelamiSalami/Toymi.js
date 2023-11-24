
import { pitchYawToDirection, mod, clamp } from "./MathUtils.js";

import m4 from "../libs/m4.module.js";

export class OrbitControls {

	constructor(mouseInput, domElement) {
		this.mouseInput = mouseInput;
		this.domElement = domElement;

		this.pitch = 0;
		this.yaw = 0;
		this.pitchVelocity = 0;
		this.yawVelocity = 0;

		this.radius = 1;
		this.radiusVelocity = 0;

		this.damping = 0.75;
		this.radiusDamping = 0.6;

		this.direction = [0, 0, 1];
		this.origin = [0, 0, 0];
		this.position = [0, 0, 0];

		this.scrollSensitivity = 2;
		this.panSensitivity = 5;

		this._addEventListeners();
	}

	update() {

		if (Math.abs(this.pitchVelocity) > 1e-4) {
			this.pitch += this.pitchVelocity;
			this.pitch = clamp(this.pitch, -Math.PI * 0.5 + 1e-4, Math.PI * 0.5 - 1e-4);
			this.pitchVelocity *= this.damping;
		}

		if (Math.abs(this.yawVelocity) > 1e-4) {
			this.yaw += this.yawVelocity;
			this.yaw = mod(this.yaw, Math.PI * 2.0);

			this.yawVelocity *= this.damping;
		}

		if (Math.abs(this.radiusVelocity) > 1e-4) {
			this.radius += this.radiusVelocity;

			this.radiusVelocity *= this.radiusDamping;
		}

		this.direction = pitchYawToDirection(this.pitch, this.yaw);
		
		m4.scaleVector(this.direction, this.radius, this.position);
		m4.addVectors(this.position, this.origin, this.position);
	}

	_addEventListeners() {
		this.domElement.addEventListener("mousemove", this._mouseMoved.bind(this));
		this.domElement.addEventListener("touchmove", this._mouseMoved.bind(this), { passive: true });

		this.domElement.addEventListener("wheel", this._mouseScrolled.bind(this), { passive: true });
	}

	_mouseMoved(event) {
		if (this.mouseInput.x != this.mouseInput.prevX || this.mouseInput.y != this.mouseInput.prevY) {
			if (this.mouseInput.buttonLeft) {
				let deltaX = (this.mouseInput.x - this.mouseInput.prevX) / this.domElement.clientWidth;
				let deltaY = (this.mouseInput.y - this.mouseInput.prevY) / this.domElement.clientHeight;

				this.pitchVelocity += deltaY * Math.PI / 3;
				this.yawVelocity += deltaX * Math.PI * 2.0 / 3;
			} else if (this.mouseInput.buttonRight) {
				let xAxis = m4.normalize(m4.cross([0, 1, 0], this.direction));
				let yAxis = m4.normalize(m4.cross(this.direction, xAxis));

				let deltaX = this.panSensitivity *  (this.mouseInput.x - this.mouseInput.prevX) / this.domElement.clientHeight;
				let deltaY = this.panSensitivity * -(this.mouseInput.y - this.mouseInput.prevY) / this.domElement.clientHeight;

				this.origin[0] -= xAxis[0] * deltaX + yAxis[0] * deltaY;
				this.origin[1] -= xAxis[1] * deltaX + yAxis[1] * deltaY;
				this.origin[2] -= xAxis[2] * deltaX + yAxis[2] * deltaY;
			}
		}
	}

	_mouseScrolled(event) {
		this.radiusVelocity += this.scrollSensitivity * event.deltaY / 1000;
	}
}