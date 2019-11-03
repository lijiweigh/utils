export default function getOffsetOfPage(el) {
	let x = 0
	let y = 0

	let w = parseInt(getComputedStyle(el)["width"])
	let h = parseInt(getComputedStyle(el)["height"])

	let parent = el.offsetParent
	while (parent) {
		x += el.offsetLeft
		y += el.offsetTop
		el = parent
		parent = parent.offsetParent
	}

	return {
		x,
		y,
		w,
		h
	}
}
