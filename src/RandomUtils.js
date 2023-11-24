
import m4 from "../libs/m4.module.js";

let a = 8, b = 2, c = 3, d = 4;

export function setSeed(an, bn, cn, dn) {
	a = an;
	b = bn;
	c = cn;
	d = dn;
}

function xoshiro128ss() {
	let t = b << 9, r = b * 5; r = (r << 7 | r >>> 25) * 9;
	c ^= a; d ^= b;
	b ^= c; a ^= d; c ^= t;
	d = d << 11 | d >>> 21;
	return (r >>> 0) / 4294967296;
}

export function hash() {
	return xoshiro128ss();
}

export function halton(sx, sy)
{
	let x = 1;
	let y = 1;
	let z = 0;
	let w = 0;
	while (sx > 0 && sy > 0) {
		x /= 2;
		y /= 3;
		z += x * mod(sx, 2);
		w += y * mod(sx, 3);
		sx = Math.floor(sx / 2);
		sy = Math.floor(sy / 3);
	}
	return [z, w];
}


export function randomPointInSphere() {
	const u = hash() * Math.PI * 2.0;
	const v = hash() * 2.0 - 1.0;
	const sinTheta = Math.sqrt(1.0 - v*v);
	const r = Math.pow(hash(), 1.0 / 3.0);

	const x = Math.cos(u) * sinTheta;
	const y = Math.sin(u) * sinTheta;
	const z = v;
	return [x * r, y * r, z * r];
}

export function randomDirection() {
	const u = hash() * Math.PI * 2.0;
	const v = hash() * 2.0 - 1.0;
	const r = Math.sqrt(1.0 - v*v);
	return [r * Math.cos(u), r * Math.sin(u), v];
}

export function randomConeDirection(alpha)
{
	const u = hash() * Math.PI * 2.0;
	const v = hash();
	const z = 1.0 - v * (1.0 - Math.cos(alpha));
	const rad = Math.sqrt(1.0 - z*z);
	return [rad * Math.cos(u), rad * Math.sin(u), z];
}

export function randomCosineHemisphere(normal) {
	return m4.normalize(m4.addVectors(normal, randomDirection()));
}

const RandomUtils = { hash, setSeed, halton,
		randomPointInSphere, randomDirection,
		randomConeDirection, randomCosineHemisphere };

export { RandomUtils };