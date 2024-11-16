import * as p5 from "p5";
import { Vector } from "p5";
import { CANVAS_HEIGHT, CANVAS_WIDTH, handleGameLoss } from ".";


export class Ball {

    position = new Vector(150,CANVAS_HEIGHT - 100)
    lastFramePosition = new Vector(150,CANVAS_HEIGHT - 100)
    ballRadius = 3
    ballDiameter = this.ballRadius*2
    xSpeed = 0;
    ySpeed = 0;

    isAlive = true

    constructor() {

    }

    draw(p: p5) {
        if(this.isAlive) {
            this.lastFramePosition = this.position.copy();
            this.position.x += this.xSpeed;
            this.position.y += this.ySpeed;
            p.circle(this.position.x, this.position.y, this.ballDiameter)
            this.checkBoundaries()
        }
    }

    launch(speed: number) {
        this.xSpeed = speed
        this.ySpeed = -6;
    }

    checkBoundaries() {
        if(this.position.x <= 0 || this.position.x + this.ballDiameter >= CANVAS_WIDTH) this.handleHorizontalCollision()
        if(this.position.y <= 0) this.handleVerticalCollision()
        if(this.position.y >= CANVAS_HEIGHT) {
            handleGameLoss()
            this.isAlive = false
        } 
            
    }

    handleVerticalCollision(): void {
        this.ySpeed = -this.ySpeed

    }

    handleHorizontalCollision(): void {
        this.xSpeed = -this.xSpeed
    }


    goFaster() {
        this.ySpeed = this.ySpeed *1.005
        this.xSpeed = this.xSpeed *1.005
    }
}