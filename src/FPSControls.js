
import { pitchYawToDirection, mod, clamp } from "./MathUtils.js";

import m4 from "../libs/m4.module.js";

export class FPSControls {

	constructor(mouseInput, keyInput, domElement) {
		this.mouseInput = mouseInput;
		this.keyInput = keyInput;
		this.domElement = domElement;

		this.pitch = 0;
		this.yaw = 0;
		this.pitchVelocity = 0;
		this.yawVelocity = 0;

		this.damping = 0.0;

		this.direction = [0, 0, 1];
		this.directionRight = [-1, 0, 0];
		this.origin = [0, 0, 0];
		this.position = [0, 0, 0];

		this.lookSensitivity = 1;

		this.speed = 1;
		this.speedupScale = 2;

		this._addEventListeners();
	}

	update() {

		let forwardSpeed = this.speed;
		let verticalSpeed = this.speed;
		let sideSpeed = this.speed;

		if (this.keyInput.shift) {
			forwardSpeed *= this.speedupScale;
			verticalSpeed *= this.speedupScale;
			sideSpeed *= this.speedupScale;
		}

		if (this.keyInput.space) {
			this.position[1] += verticalSpeed;
		}

		if (this.keyInput.c) {
			this.position[1] -= verticalSpeed;
		}

		if (this.keyInput.up || this.keyInput.down) {
			if (this.keyInput.down) {
				forwardSpeed = -forwardSpeed;
			}
			m4.addVectors(this.position, m4.scaleVector(this.direction, forwardSpeed), this.position);
		}

		if (this.keyInput.left || this.keyInput.right) {
			if (this.keyInput.left) {
				sideSpeed = -sideSpeed;
			}
			m4.addVectors(this.position, m4.scaleVector(this.directionRight, sideSpeed), this.position);
		}

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
		this.directionRight = m4.normalize(m4.cross(this.direction, [0, 1, 0]));

		m4.addVectors(this.position, this.direction, this.origin);
	}

	_addEventListeners() {
		this.domElement.addEventListener("mousemove", this._mouseMoved.bind(this));
		this.domElement.addEventListener("touchmove", this._mouseMoved.bind(this), { passive: true });
	}

	_mouseMoved(event) {
		if (this.mouseInput.x != this.mouseInput.prevX || this.mouseInput.y != this.mouseInput.prevY) {
			if (this.mouseInput.buttonLeft) {
				let deltaX = this.lookSensitivity * (this.mouseInput.x - this.mouseInput.prevX) / this.domElement.clientWidth;
				let deltaY = this.lookSensitivity * (this.mouseInput.y - this.mouseInput.prevY) / this.domElement.clientHeight;

				this.pitchVelocity -= deltaY * Math.PI;
				this.yawVelocity += deltaX * Math.PI * 2.0;
			}
		}
	}

}