
export class ShaderProgram {

	constructor(gl, vertexShaderString, fragmentShaderString) {
		this.gl = gl;

		const vertexShader = ShaderProgram.compileShader(gl, gl.VERTEX_SHADER, vertexShaderString);
		const fragmentShader = ShaderProgram.compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderString);

		this.glProgram = ShaderProgram.createProgram(gl, vertexShader, fragmentShader);
		this.uniforms = this._getActiveUniforms();
	}

	use() {
		this.gl.useProgram(this.glProgram);
	}

	setUniform(name, value) {

		const uniform = this.uniforms[name];
		if (!uniform) {
			// console.error(`Uniform ${name} in ${this.glProgram} not found!`);
			return;
		}

		return uniform.setter(uniform.location, value);
	}

	_getActiveUniforms() {

		const uniforms = {};
		const uniformCount = this.gl.getProgramParameter(this.glProgram, this.gl.ACTIVE_UNIFORMS);

		for (let i = 0; i < uniformCount; i++) {
			const uniform = this.gl.getActiveUniform(this.glProgram, i);
			uniforms[uniform.name] = {
				location: this.gl.getUniformLocation(this.glProgram, uniform.name),
				setter: this._getUniformSetter(uniform.type),
				type: uniform.type
			};
		}

		return uniforms;
	}

	_getUniformSetter(type) {

		switch(type) {
			case this.gl.FLOAT:
				return (location, value) => { this.gl.uniform1f(location, value) };
			case this.gl.FLOAT_VEC2:
				return (location, value) => { this.gl.uniform2fv(location, value) };
			case this.gl.FLOAT_VEC3:
				return (location, value) => { this.gl.uniform3fv(location, value) };
			case this.gl.FLOAT_VEC4:
				return (location, value) => { this.gl.uniform4fv(location, value) };
			case this.gl.INT:
			case this.gl.BOOL:
			case this.gl.UNSIGNED_INT:
			case this.gl.SAMPLER_2D:
				return (location, value) => { this.gl.uniform1i(location, value) };
			case this.gl.INT_VEC2:
			case this.gl.BOOL_VEC2:
			case this.gl.UNSIGNED_INT_VEC2:
				return (location, value) => { this.gl.uniform2iv(location, value) };
			case this.gl.INT_VEC3:
			case this.gl.BOOL_VEC3:
			case this.gl.UNSIGNED_INT_VEC3:
				return (location, value) => { this.gl.uniform3iv(location, value) };
			case this.gl.INT_VEC4:
			case this.gl.BOOL_VEC4:
			case this.gl.UNSIGNED_INT_VEC4:
				return (location, value) => { this.gl.uniform4iv(location, value) };
			case this.gl.FLOAT_MAT2:
				return (location, value) => { this.gl.uniformMatrix2fv(location, false, value) };
			case this.gl.FLOAT_MAT3:
				return (location, value) => { this.gl.uniformMatrix3fv(location, false, value) };
			case this.gl.FLOAT_MAT4:
				return (location, value) => { this.gl.uniformMatrix4fv(location, false, value) };
		}
	}

	static compileShader(gl, type, source) {
		const shader = gl.createShader(type);

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		return shader;
	}

	static createProgram(gl, vertShader, fragShader) {
		const program = gl.createProgram();

		gl.attachShader(program, vertShader);
		gl.attachShader(program, fragShader);
		gl.linkProgram(program);

		const success = gl.getProgramParameter(program, gl.LINK_STATUS);
		if (!success) {
			console.error(`Program linking failed: ${gl.getProgramInfoLog(program)}`);
			console.error(`Vertex shader info log: ${gl.getShaderInfoLog(vertShader)}`);
			console.error(`Fragment shader info log: ${gl.getShaderInfoLog(fragShader)}`);

			gl.deleteShader(vertShader);
			gl.deleteShader(fragShader);
			gl.deleteProgram(program);
			return undefined;
		}
		return program;
	}
}