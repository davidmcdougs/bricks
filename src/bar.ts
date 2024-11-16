import * as p5 from "p5";
import { CANVAS_HEIGHT } from ".";
import { Ball } from "./ball";

export class Bar {
    width = 60
    height = 10
    position = new p5.Vector(0, CANVAS_HEIGHT - 50)

    constructor(){}

    draw(p: p5) {
        this.position.x = p.mouseX -(this.width/2)
        p.rect(this.position.x, this.position.y, this.width, 10)

    }

    detectBallTouch(ball: Ball) {
        const ballX = ball.position.x
        const ballY = ball.position.y
        const isTouchingTopSide = (ballX >= this.position.x && ballX <= this.position.x + this.width) && (this.position.y <= ball.position.y && this.position.y >= ball.lastFramePosition.y)
        if(isTouchingTopSide) ball.handleVerticalCollision();
    }
}