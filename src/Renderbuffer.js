
export class Renderbuffer {

	constructor(gl, {
			width = 1024,
			height = 1024,
			format = gl.DEPTH_COMPONENT24
		} = {}) {

		const renderbuffer = gl.createRenderbuffer();

		gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
		gl.renderbufferStorage(gl.RENDERBUFFER, format, width, height);
	}

	bind() {
		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.glRenderbuffer);
	}
}