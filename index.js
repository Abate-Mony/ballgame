"use strict"
import Game from "./game.js"

const cvs = gI("canvas")
const ctx = cvs.getContext("2d")
const GAME_HEIGHT = cvs.height = window.innerHeight
const GAME_WIDTH = cvs.width = window.innerWidth

const game = new Game(GAME_WIDTH, GAME_HEIGHT)
game.start()

let delayTime = 0
const startGame = () => {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    game.draw(ctx)
    game.update()

}
setInterval(() => { startGame() }, 50)