import Player from "./player.js"
import Input from "./input.js"
import Fruit from "./fruits.js"
import Enemy from "./bomb.js"
let timer = null
export default class Game {
    constructor(gamewidth, gameheight) {
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.gamePlaying = 1
        this.counter = 0
        this.lives = 15
        this.text = "Game Over"
        this.havehit = false
        this.image = gI("enemy")
    }
    GAME_STATE = {
            running: 1,
            paused: 2,

        }
        /**
         * @param {any} x
         */

    set increementCounter(x) {
        this.counter++
    }
    get increementCounter() {
            return this.counter
        }
        /**
         * @param {any} x
         */
    set decrementLives(x) {
        this.lives--
    }
    get decrementLives() {
        return this.lives
    }
    resetLives() {
        this.lives = 15
    }
    changeState = () => {
        this.gamePlaying = !this.gamePlaying
    }

    requestFullScreen = (element) => {
        this.gamewidth = innerWidth
        this.gameheight = innerHeight
            // Supports most browsers and their versions.
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) { // Native full screen.
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }

    start = () => {
        // return
        this.player = new Player(this)
        this.changeState()
        new Input(this.player, this)
        this.enemy = new Enemy(this)
        const fruits = []


        for (let i = 0; i < 5; i++) {
            fruits.push(new Fruit(this, gI("enemy")))
        }

        for (let i = 0; i < 3; ++i) {
            fruits.push(new Enemy(this, gI("enemy")))
        }
        this.gameObject = [
            ...fruits,
            this.player
        ]


        timer = setInterval(() => {
            const newEnemies = []
            for (let i = 0; i < 3; ++i) {
                newEnemies.push(new Enemy(this, gI("enemy")))
            }
            this.gameObject = [
                ...this.gameObject,
                ...newEnemies
            ]
        }, 30000);

        document.body.addEventListener("click", e => {
            this.requestFullScreen(gI("canvas"))
        })

    }
    draw = (ctx) => {

        ctx.font = '30px Arial';
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.fillText("Scores : " + this.counter, (this.gamewidth / 2), 20);
        ctx.font = '30px Arial';
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.fillText("lives : " + this.lives, (this.gamewidth * 0.25), 20);
        // console.log(this.gameObject.filter((object) => {
        //     if (object.markForDeletion != true) return object

        // }));
        this.gameObject =
            this.gameObject.filter((object) => {
                if (object.markForDeletion != true) return object

            })
        this.gameObject.forEach((object) => object.draw(ctx))
        if (this.gamePlaying) {
            ctx.beginPath()
            ctx.fillStyle = "rgba(0,0,0,0.6)"
                // this.text = "Game Paused"
            ctx.fillRect(0, 0, this.gamewidth, this.gameheight)
            ctx.font = '20px Arial';
            ctx.fillStyle = "black";
            ctx.beginPath()
            ctx.fillText(this.text, (this.gamewidth / 2) - 110, this.gameheight / 2);

        }
        if (this.havehit) {
            ctx.beginPath()
            ctx.fillStyle = "transparent"
            ctx.fillRect(0, 0, this.gamewidth, this.gameheight)
            ctx.font = '50px Arial';
            ctx.fillStyle = "orange";
            ctx.beginPath()
            ctx.fillText("hit the enemy", (this.gamewidth / 2) - 110, this.gameheight / 2);
        }
    }
    update = () => {
        if (this.gamePlaying) {
            // this.gamePlaying = this.GAME_STATE.paused

            return
        }
        this.gameObject.forEach((object) => object.update())
    }

}