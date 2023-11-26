
export class Mesh {

	constructor(gl) {
		this.gl = gl;

		this.vao = gl.createVertexArray();
		this.mode = gl.TRIANGLES;
		this.count = 0;

		this.attributes = {};
	}

	setAttribute(name, { data, dataType, count, byteCount, usage = this.gl.STATIC_DRAW }) {
		const buffer = this.gl.createBuffer();

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, data, usage);

		this.attributes[name] = {
			data: data,
			dataType: dataType,
			count: count,
			buffer: buffer
		}
	}

	bindAttributes(program) {

		this.bind();

		for (const name in this.attributes) {
			const attribute = this.attributes[name];

			const attributeLoc = this.gl.getAttribLocation(program.glProgram, name);

			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attribute.buffer);
			this.gl.vertexAttribPointer(attributeLoc, attribute.count, attribute.dataType, false, 0, 0);
			this.gl.enableVertexAttribArray(attributeLoc);
		}
	}

	bind() {
		this.gl.bindVertexArray(this.vao);
	}

	setDrawMode(mode, count) {
		this.mode = mode;
		this.count = count;
	}

	draw() {
		this.bind();
		this.gl.drawArrays(this.mode, 0, this.count);
	}

	static createQuadMesh(gl, program) {

		const mesh = new Mesh(gl);

		mesh.setDrawMode(gl.TRIANGLE_FAN, 4);

		mesh.setAttribute("aPosition", {
			data: new Float32Array([-1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0]),
			dataType: gl.FLOAT,
			count: 2
		});
		mesh.setAttribute("aUv", {
			data: new Float32Array([0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0]),
			dataType: gl.FLOAT,
			count: 2
		});
		mesh.bindAttributes(program);

		return mesh;
	}

	static createFullscreenMesh(gl, program) {

		const mesh = new Mesh(gl);

		mesh.setDrawMode(gl.TRIANGLES, 3);

		mesh.setAttribute("aPosition", {
			data: new Float32Array([-1.0, -1.0, -1.0, 3.0, 3.0, -1.0]),
			dataType: gl.FLOAT,
			count: 2
		});
		mesh.setAttribute("aUv", {
			data: new Float32Array([0.0, 0.0, 0.0, 2.0, 2.0, 0.0]),
			dataType: gl.FLOAT,
			count: 2
		});
		mesh.bindAttributes(program);

		return mesh;
	}
}