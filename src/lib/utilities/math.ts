export function remToPX(rem: number) {
	return Math.ceil(rem * parseFloat(getComputedStyle(document.documentElement).fontSize));
}

export function vwToPX(vw: number) {
	return Math.ceil(vw * window.innerWidth / 100);
}


const round = (value: number, places: number) => {

    const power = 10 ** places;
    return Math.round((value + Number.EPSILON) * power) / power;
}

function clamp(number: number, min: number, max: number)
{   
    if (isNaN(number)) { return min }
    return Math.max(min, Math.min(number, max));
}

export { round, clamp };