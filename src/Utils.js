
import Stats from "../libs/stats.module.js";

export function resizeCanvasToDisplaySize(canvas, pixelRatio) {
	pixelRatio = pixelRatio || 1;
	const width  = canvas.clientWidth * pixelRatio | 0;
	const height = canvas.clientHeight * pixelRatio | 0;
	if (canvas.width !== width ||  canvas.height !== height) {
		canvas.width = width;
		canvas.height = height;
		return true;
	}
	return false;
}

export function disableContextMenu(element) {
	element.addEventListener("contextmenu", (event) => {
		if (event.button == 2) {
			event.preventDefault();
		}
	});
}

export function addStatsJS(type = 0, domElement = document.body) {
	const stats = new Stats();

	stats.showPanel(type); // 0: fps, 1: ms, 2: mb, 3+: custom
	domElement.appendChild(stats.dom);

	function update() {
		stats.update();

		requestAnimationFrame(update);
	}
	requestAnimationFrame(update);
}

const Utils = { resizeCanvasToDisplaySize, disableContextMenu, addStatsJS };

export { Utils };