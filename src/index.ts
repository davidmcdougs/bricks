import * as p5 from "p5";
import { Brick, setupBricks } from "./brick";
import { Ball } from "./ball";
import { Bar } from "./bar";

export const CANVAS_WIDTH = 300;
export const CANVAS_HEIGHT = 400;

let bar: Bar
let ball: Ball
let bricks: Brick[] = []


export const sketch = (p: p5) => {

  p.setup = () => {
    reset();
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    alert("click to launch ball")
  };

  p.draw = () => {
    p.background(220);
    ball.draw(p)
    bar.draw(p)
    bar.detectBallTouch(ball)
    bricks.forEach(brick => brick.draw(p, ball))
    detectWin()
  };

  p.mouseClicked = () => {
    ball.launch(2)
    return false;
  }
};

function detectWin() {
  const allBricksDead = bricks.every(brick => !brick.isAlive);
  if(allBricksDead) {
    alert('YOU WON!!!')
    reset()
  } 
}

function reset() {
  bar = new Bar();
  ball = new Ball();
  bricks = setupBricks();
}


export const myp5 = new p5(sketch, document.body);


export function handleGameLoss() {
  alert('you died')
  reset()
}

