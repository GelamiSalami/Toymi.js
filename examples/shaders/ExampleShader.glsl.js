
const vertex = `#version 300 es
in vec4 aPosition;
in vec2 aUv;

out vec2 vUv;

void main() {
	gl_Position = aPosition;
	vUv = aUv;
}
`;

const fragment = `#version 300 es
precision highp float;

uniform float uTime;

in vec2 vUv;

out vec4 fragColor;

void main() {
	vec3 color = cos(uTime + vUv.xyx * 12.0 + vec3(0, 2, 4)) * 0.5 + 0.5;

	fragColor = vec4(color, 1);
}
`;

export default { vertex, fragment };

