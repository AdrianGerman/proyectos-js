const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

const MODES = {
  FALL: "fall",
  BOUNCE: "bounce",
  GAMEOVER: "gameover"
}
const INITIAL_BOX_WIDTH = 200
const INITIAL_BOX_Y = 600

const BOX_HEIGHT = 50
const INITIAL_Y_SPEED = 5
const INITAL_X_SPEED = 2

// state
let boxes = []
let scrollCounter, cameraY, current, mode, xSpeed, ySpeed

function initializeGameState() {
  boxes = [
    {
      x: canvas.width / 2 - INITIAL_BOX_WIDTH / 2,
      y: 200,
      width: INITIAL_BOX_WIDTH,
      color: "white"
    }
  ]
  current = 1
  mode = MODES.BOUNCE
  xSpeed = INITAL_X_SPEED
  ySpeed = INITIAL_Y_SPEED
  scrollCounter = 0
  cameraY = 0
}

function restart() {
  initializeGameState()
  draw()
}

function draw() {
  if (mode === MODES.GAMEOVER) return

  drawBackground()
  drawBoxes()

  window.requestAnimationFrame(draw)
}

function drawBackground() {
  context.fillStyle = "rgba(0, 0, 0, 0.2)"
  context.fillRect(0, 0, canvas.width, canvas.height)
}

function drawBoxes() {
  boxes.forEach((box) => {
    const { x, y, width, color } = box
    const newY = INITIAL_BOX_Y - y

    context.fillStyle = color
    context.fillRect(x, newY, width, BOX_HEIGHT)
  })
}

restart()
