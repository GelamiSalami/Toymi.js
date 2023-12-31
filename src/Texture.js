
export class Texture {

	constructor(gl, {
			width = 512,
			height = 512,
			internalformat = gl.RGBA,
			format = gl.RGBA,
			type = gl.UNSIGNED_BYTE,
			data = null,
			minFilter = gl.LINEAR,
			magFilter = gl.LINEAR,
			wrapMode = gl.CLAMP_TO_EDGE
		} = {}) {

		this.gl = gl;
		this.width = width;
		this.height = height;
		this.internalformat = internalformat;
		this.format = format;
		this.type = type;
		this.glTexture = gl.createTexture();

		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, internalformat, width, height, 0, format, type, data);

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapMode);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapMode);
	}

	bind(index = 0) {
		this.gl.activeTexture(this.gl.TEXTURE0 + index);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.glTexture);
	}

	resize(width, height) {
		this.width = width;
		this.height = height;

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.glTexture);
		this.gl.texImage2D(gl.TEXTURE_2D, 0, this.internalformat, width, height, 0, this.format, this.type, null);
	}
}