
export class KeyInput {

	constructor(domElement) {
		this.domElement = domElement;
		this.keys = {};

		this._addEventListeners();
	}

	_addEventListeners() {

		this.domElement.addEventListener("keydown", this._keyPressed.bind(this));
		this.domElement.addEventListener("keyup", this._keyReleased.bind(this));
	}

	_setInputs(event, value) {
		const keyCode = event.keyCode;

		switch (keyCode) {
			case 37:
			case 65:
				this.left = value;
				break;
			case 39:
			case 68:
				this.right = value;
				break;
			case 38:
			case 87:
				this.up = value;
				break;
			case 40:
			case 83:
				this.down = value;
				break;
			case 32:
				this.space = value;
				break;
			case 16:
				this.shift = value;
				break;
			case 81:
				this.q = value;
				break;
			case 69:
				this.e = value;
				break;
			case 17:
				this.ctrl = value;
				break;
			case 67:
				this.c = value;
				break;
		}
	}

	_keyPressed(event) {
		this._setInputs(event, true);
	}

	_keyReleased(event) {
		this._setInputs(event, false);
	}
}