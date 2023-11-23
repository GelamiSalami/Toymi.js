
export class Framebuffer {

	constructor(gl, width, height, ...attachments) {
		this.gl = gl;
		this.width = width;
		this.height = height;
		this.glFramebuffer = gl.createFramebuffer();

		gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer);

		for (const attachment of attachments) {
			if (attachment instanceof WebGLRenderbuffer) {
				gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment.type, gl.RENDERBUFFER, attachment.texture);
			} else {
				gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment.type, gl.TEXTURE_2D, attachment.texture, attachment.level || 0);
			}
		}
	}

	bind() {
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.glFramebuffer);
		this.gl.viewport(0, 0, this.width, this.height);
	}
}