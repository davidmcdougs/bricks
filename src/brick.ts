import * as p5 from "p5";
import { Vector  } from "p5";
import { Ball } from "./ball";

const brickWidth = 30;
const brickHeight = 10;

export class Brick {

    startingPosition: Vector
    endPosition: Vector
    isAlive = true
    width = brickWidth
    height = brickHeight

    upLeftCorner: Vector
    upRightCorner: Vector
    bottomLeftCorner: Vector
    bottomRightCorner: Vector



    constructor(xPos: number, yPos: number) {
        this.startingPosition = new Vector(xPos, yPos)
        this.endPosition = new Vector(xPos + brickWidth, yPos + brickHeight)
        this.upLeftCorner = this.startingPosition
        this.upRightCorner = new Vector(xPos+brickWidth, yPos)
        this.bottomLeftCorner = new Vector(xPos, yPos+brickHeight)
        this.bottomRightCorner = this.endPosition
    }

    draw(p: p5, ball: Ball):  void {
        if(this.isAlive) {
            p.rect(this.startingPosition.x, this.startingPosition.y, this.width, this.height)
            this.detectBallTouch(ball)
        } 
    }

    detectBallTouch(ball: Ball): void {
        const ballX = ball.position.x
        const ballY = ball.position.y
        const isTouchingTopSide: boolean = (ballX >= this.upLeftCorner.x && ballX <= this.upRightCorner.x) && (this.startingPosition.y <= ballY && this.startingPosition.y >= ball.lastFramePosition.y)
        const isTouchingBottomSide: boolean = (ballX >= this.bottomLeftCorner.x && ballX <= this.bottomRightCorner.x) && (this.endPosition.y >= ballY && this.endPosition.y <= ball.lastFramePosition.y)
        const isTouchingLeftSide: boolean = (ballY >= this.upLeftCorner.y && ballY <= this.upRightCorner.y) && (ballX == this.startingPosition.x)
        const isTouchingRightSide: boolean = (ballY >= this.bottomLeftCorner.y && ballY <= this.bottomRightCorner.y) && (ballX == this.endPosition.x)
        if(isTouchingTopSide || isTouchingBottomSide) {
            ball.handleVerticalCollision()
            this.handleDeath(ball)
        }

        if(isTouchingLeftSide || isTouchingRightSide) {
            ball.handleHorizontalCollision()
            this.handleDeath(ball)             
        }
    }

    handleDeath(ball: Ball) {
        this.isAlive = false;
        ball.goFaster()
    }


}


export function setupBricks(): Brick[] {
  const printer = new Vector(0, 0)
  const bricks: Brick[] = []
  let evenRow = true;
  while(shouldPrintRow(printer, 100)) {
    generateRow(printer).forEach(x => bricks.push(x))
    printer.y += brickHeight
    if(evenRow) printer.x = brickWidth /2
    else printer.x = 0
    evenRow = !evenRow
  }
  return bricks;
}

function generateRow(startingSpot: Vector): Brick[] {
    const row = []
    let printer: Vector = startingSpot.copy()
    while(shouldPrintBrick(printer, 300)) {
        row.push(new Brick(printer.x, printer.y))
        printer.x += brickWidth;
    }
    return row;
}

function shouldPrintBrick(printer: Vector, xCap: number): boolean {
    if(printer.x + brickWidth > xCap) return false;
    return true;
}

function shouldPrintRow(printer: Vector, yCap: number): boolean {
    return printer.y < yCap;
}