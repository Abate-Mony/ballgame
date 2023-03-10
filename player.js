export default class Player {
    constructor(game) {
        this.gamewidth = game.gamewidth
        this.gameheight = game.gameheight
        this.width = 100
        this.height = 50
        this.maxSpeed = 30
        this.speed = 0
        this.img = gI("brick")
        this.position = {
            x: (this.gamewidth - this.width) / 2,
            y: this.gameheight - this.height
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
        ctx.beginPath()

    }

    move(v) {
        if (v === -1) {
            this.speed = -this.maxSpeed
            return
        }
        this.speed = this.maxSpeed
    }
    check() {
        if (this.position.x < 0) this.position.x = this.gamewidth - this.width
        if ((this.position.x + this.width) > this.gamewidth) this.position.x = 0

    }
    update() {
        this.check()
        this.position.x += this.speed
    }
    stop() {
            this.speed = 0
        }
        /**
         * @param {number} x
         */
    set xdir(x) {
        this.position.x = x
    }
    get xdir() { return this.position.x }
    get WIDTH() { return this.width }
    get HEIGHT() { return this.height }

}