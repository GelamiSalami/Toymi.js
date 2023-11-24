
export function pitchYawToDirection(pitch, yaw) {
	return [Math.cos(yaw) * Math.cos(pitch), Math.sin(pitch), Math.sin(yaw) * Math.cos(pitch)];
}

export function mod(x, y) {
	return x - y * Math.floor(x / y);
}

export function fract(x) {
	return x - Math.floor(x);
}

export function clamp(x, xmin, xmax) {
	return Math.min(Math.max(x, xmin), xmax);
}

const MathUtils = { pitchYawToDirection, mod, fract, clamp };

export { MathUtils };