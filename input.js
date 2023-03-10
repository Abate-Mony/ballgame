export default class Input {
    constructor(player, gamestate) {
        this.gamewidth = gamestate.gamewidth
        this.leftSideOfGame = this.gamewidth * 0.25
        this.rightSideOfGame = this.gamewidth * 0.75
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
                console.log("enter here");
                const touchstart = touches[0].clientX
                if (touchstart <= this.leftSideOfGame) {
                    player.move(-1)
                    return
                }
                if (touchstart >= this.rightSideOfGame) {
                    player.move(1)
                    return
                }
                return
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
                if (player.speed > 0) player.stop()
                if (player.speed < 0) player.stop()
                return
            }

        }


        document.addEventListener("keydown", this.movePlayer)
        document.addEventListener("keyup", this.movePlayer)


        document.addEventListener("touchstart", this.movePlayer)
        document.addEventListener("touchend", this.movePlayer)
    }

}