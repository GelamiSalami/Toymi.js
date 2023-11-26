
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

uniform sampler2D uTexture;

in vec2 vUv;

out vec4 fragColor;

void main() {
	vec3 color = texture(uTexture, vUv).rgb;

	fragColor = vec4(color, 1);
}
`;

export default { vertex, fragment };

