# Toymi.js
Minimal WebGL2 thin library for prototyping 3D graphics

### Usage

[Basic Example](https://github.com/GelamiSalami/Toymi.js/examples/basic_example.html)

```javascript
import { ExampleShader } from "./shaders/ShaderSources.js";
import { ShaderProgram, Mesh, Utils } from "../build/toymi.module.min.js";

const canvas = document.getElementById("main-canvas");
const gl = canvas.getContext("webgl2", { antialias: false });

const program = new ShaderProgram(gl, ExampleShader.vertex, ExampleShader.fragment);
const mesh = Mesh.createFullscreenMesh(gl, program);

function render(currentTime) {
	if (Utils.resizeCanvasToDisplaySize(gl.canvas)) {
	}

	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	program.use();

	program.setUniform("uTime", currentTime / 1000);

	mesh.draw();

	requestAnimationFrame(render);
}
requestAnimationFrame(render);
```