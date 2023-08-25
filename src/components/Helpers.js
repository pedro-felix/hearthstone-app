export function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    const result = (Math.floor(Math.random() * (max - min + 1)) + min) || max;
    return result;
}

export function isObjEmpty (obj) {
    return Object.keys(obj).length === 0;
}