const setGameLevel = (value) => {
    if (value > 46) return [40, 45]
    if (value > 30) return [30, 45]
    if (value > 20) return [20, 35]
    if (value > 15) return [10, 20]
    if (value > 10) return [8, 17]
    return [10, 15]

}
export {
    setGameLevel
}