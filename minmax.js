const { random, floor } = Math
export function randomv(min, max) {
    return floor(random() * max) + min
}
export function randomx(value) {
    return floor(random() * value)
}