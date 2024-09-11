// CONSTANTS
const MODES = {
  DRAW: "draw",
  ERASE: "erase",
  RECTANGLE: "rectangle",
  ELLIPSE: "ellipse",
  PICKER: "picker"
}

// UTILITIES
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// ELEMENTS
const $canvas = $("#canvas")
const $colorPicker = $("#color-picker")
const $clearBtn = $("#clear-btn")
const ctx = $canvas.getContext("2d")

// STATE
let isDrawing = false
let startX, startY
let lastX = 0
let lastY = 0
let mode = MODES.DRAW

// EVENTS
$canvas.addEventListener("mousedown", startDrawing)
$canvas.addEventListener("mousemove", draw)
$canvas.addEventListener("mouseup", stopDrawing)
$canvas.addEventListener("mouseleave", stopDrawing)

$colorPicker.addEventListener("change", handleChangeColor)
$clearBtn.addEventListener("click", clearCanvas)

// METHODS
function startDrawing(event) {
  isDrawing = true
  const { offsetX, offsetY } = event

  // Guardar las coordenadas iniciales
  ;[startX, startY] = [offsetX, offsetY]
  ;[lastX, lastY] = [offsetX, offsetY]

  console.log({ startX, startY, lastX, lastY })
}

function draw(event) {
  if (!isDrawing) return

  const { offsetX, offsetY } = event

  // comenzar un trazadod
  ctx.beginPath()

  // mover el trazadoa a las coordenadas actuales
  ctx.moveTo(lastX, lastY)

  // dibujar entre los puntos de coordenadas
  ctx.lineTo(offsetX, offsetY)

  ctx.stroke()

  ctx.lineWidth = 2

  // actualizar las últimas coordenadas
  ;[lastX, lastY] = [offsetX, offsetY]
}

function stopDrawing(event) {
  isDrawing = false
}

function handleChangeColor() {
  const { value } = $colorPicker
  ctx.strokeStyle = value
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}
