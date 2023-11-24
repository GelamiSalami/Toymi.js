
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

const Utils = { resizeCanvasToDisplaySize, disableContextMenu };

export { Utils };