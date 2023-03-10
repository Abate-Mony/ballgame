import { randomv, randomx } from './minmax.js'
import { gameOver, hitsound, gameSound } from "./audio.js"
import { setGameLevel } from './gamelevel.js'
export default class Fruit {
    constructor(game, image) {
        this.img = gI("ball")
        gameSound.volume = 0.1
        gameSound.play()
        this.game = game
        this.width = 25
        this.height = 25
        this.size = 50
        this.min = 5
        this.max = 10
        this.vy = randomv(this.min, this.max)
        this.position = {
            x: randomx(this.game.gamewidth),
            y: 0
        }
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.size, this.size)
        ctx.beginPath()
    }
    changePos() {
        const [m1, m2] = setGameLevel(this.game.increementCounter)
        this.min = m1
        this.max = m2
        this.position.y = 0
        this.position.x = randomx(this.game.gamewidth)
        this.vy = randomv(this.min, this.max)
    }
    check() {
        const leftSideOfPlayer = this.game.player.position.x
        const rightSideOfPlayer = this.game.player.position.x + this.game.player.width
        const bottomOfFruits = this.position.y + this.size
        const topOfPlayer = this.game.player.position.y
        if ((this.position.x + this.size) >= leftSideOfPlayer &&
            rightSideOfPlayer >= this.position.x &&
            bottomOfFruits >= topOfPlayer
        ) {

            if (!this.enemy) {
                this.game.increementCounter++
                    hitsound.load()
                setTimeout(() => {
                    hitsound.play()
                }, 100);

            } else {
                // this.markForDeletion = true
                this.game.player.maxSpeed = 0
                this.game.havehit = true
                this.timer = setTimeout(() => {
                    clearInterval(this.timer)
                    this.game.player.maxSpeed = 30
                    this.game.havehit = false
                }, 2000);
                this.game.decrementLives--
                    if (this.game.decrementLives <= 0) {
                        this.game.text = "Game Over"
                        this.game.gamePlaying = true
                        gameOver.play()
                        gameSound.load()
                        setTimeout(() => {
                            this.game.gamePlaying = false
                            if (this.game.decrementLives > 0) return
                            this.game.resetLives()
                            this.game.counter = 0
                            gameOver.load()
                            gameSound.play()

                        }, 5000);
                    }
            }
            return this.changePos()
        }
        if (this.position.y >= this.game.gameheight) {
            this.changePos()
        }
    }
    update() {
        this.check()
        this.position.y += this.vy
    }
}