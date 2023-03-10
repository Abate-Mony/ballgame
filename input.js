const cvs = gI("canvas")

// console.log("left", left);
export default class Input {
    constructor(player, gamestate) {
        this.gamewidth = gamestate.gamewidth
        this.gameHeight = gamestate.gameheight
        this.leftSideOfGame = this.gamewidth * 0.25
        this.rightSideOfGame = this.gamewidth * 0.75
        this.mousedown = false
        this.position = null
        this.movePlayer = event => {
            const { type, keyCode, touches } = event
            if (type == "keydown") {
                if (keyCode == 37) {
                    player.move(-1)
                }
                if (keyCode == 39) {
                    player.move(1)

                }
                return
            }
            if (type == "touchstart") {
                const touchstart = touches[0].clientX
                const { clientY } = touches[0]
                console.log(
                    touchstart,
                    player.xdir + player.WIDTH,
                    (player.xdir + player.WIDTH) >= touchstart, this.gameHeight - player.HEIGHT
                )
                if (touchstart >= player.xdir &&
                    (player.xdir + player.WIDTH) >= touchstart && (this.gameHeight - player.HEIGHT) <= clientY) {
                    console.log("enter here hahah")
                    this.mousedown = true

                }
                return
                if (touchstart <= this.leftSideOfGame) {
                    player.move(-1)
                    return
                }
                if (touchstart >= this.rightSideOfGame) {
                    player.move(1)
                    return
                }
            }
            if (type == "touchmove") {
                if (this.mousedown) {
                    player.xdir = event.touches[0].clientX
                }

            }
            if (type == "keyup") {
                // code here
                if (keyCode == 37) {
                    if (player.speed < 0) player.stop()
                }
                if (keyCode == 39) {
                    // player.stop()
                    if (player.speed > 0) player.stop()
                }
                if (keyCode == 32) {
                    // gamestate()


                    gamestate.changeState()
                }
                return
            }
            if (type == "touchend") {
                this.mousedown = false
                return
                if (player.speed > 0) player.stop()
                if (player.speed < 0) player.stop()
                return
            }

        }


        cvs.addEventListener("keydown", this.movePlayer)
        cvs.addEventListener("keyup", this.movePlayer)


        cvs.addEventListener("touchstart", this.movePlayer)
        cvs.addEventListener("touchmove", this.movePlayer)
        cvs.addEventListener("touchend", this.movePlayer)
    }

}