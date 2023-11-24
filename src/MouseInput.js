
export class MouseInput {

	constructor(domElement) {
		this.domElement = domElement;
		this.x = 0;
		this.y = 0;
		this.prevX = 0;
		this.prevY = 0;
		this.scroll = 0;
		this.isPressed = false;
		this.buttonLeft = false;
		this.buttonRight = false;

		this._addEventListeners();
	}

	_addEventListeners() {

		this.domElement.addEventListener("mousemove", this._mouseMoved.bind(this));
		this.domElement.addEventListener("touchmove", this._mouseMoved.bind(this), { passive: true });

		this.domElement.addEventListener("mousedown", this._mousePressed.bind(this));
		this.domElement.addEventListener("touchstart", this._mousePressed.bind(this), { passive: true });

		this.domElement.addEventListener("mouseup", this._mouseReleased.bind(this));
		this.domElement.addEventListener("touchend", this._mouseReleased.bind(this));

		this.domElement.addEventListener("mouseleave", this._mouseReleased.bind(this));
		this.domElement.addEventListener("touchleave", this._mouseReleased.bind(this));

		this.domElement.addEventListener("wheel", this._mouseScrolled.bind(this), { passive: true });
	}

	_mouseMoved(event) {
		let x = event.clientX != null ? event.clientX : event.touches[0].clientX;
		let y = event.clientY != null ? event.clientY : event.touches[0].clientY;
		let rect = this.domElement.getBoundingClientRect();

		this.prevX = this.x;
		this.prevY = this.y;
		this.x = x - rect.left;
		this.y = y - rect.top;
	}

	_mousePressed(event) {
		let x = event.clientX != null ? event.clientX : event.touches[0].clientX;
		let y = event.clientY != null ? event.clientY : event.touches[0].clientY;
		let rect = this.domElement.getBoundingClientRect();

		this.x = x - rect.left;
		this.y = y - rect.top;
		this.prevX = this.x;
		this.prevY = this.y;
		this.isPressed = true;

		if (event.button == 0) {
			this.buttonLeft = true;
		}
		if (event.button == 2) {
			this.buttonRight = true;
		}
		if (event.touches) {
			if (event.touches.length > 1) {
				this.buttonRight = true;
			}
		}
	}

	_mouseReleased(event) {
		this.pressed = false;
		this.buttonLeft = false;
		this.buttonRight = false;
	}

	_mouseScrolled(event) {
		this.scroll = event.deltaY;
	}
}