import Fruit from "./fruits.js";

export default class Enemy extends Fruit {
    constructor(game, image) {
        super(game)
        this.img = image
        this.enemy = true
        this.markForDeletion = false
    }
}