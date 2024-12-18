// CONSTANTS
const MODES = {
  DRAW: "draw",
  ERASE: "erase",
  RECTANGLE: "rectangle",
  ELLIPSE: "ellipse",
  PICKER: "picker",
  SAVE: "save",
  FILL: "fill"
}

// UTILITIES
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// ELEMENTS
const $canvas = $("#canvas")
const $colorPicker = $("#color-picker")
const $thicknessInput = $("#thickness")
const $clearBtn = $("#clear-btn")
const $drawBtn = $("#draw-btn")
const $rectangleBtn = $("#rectangle-btn")
const $ellipseBtn = $("#ellipse-btn")
const $eraseBtn = $("#erase-btn")
const $pickerBtn = $("#picker-btn")
const $saveBtn = $("#save-btn")
const $fillBtn = $("#fill-btn")
const ctx = $canvas.getContext("2d")

// STATE
let isDrawing = false
let isShiftPressed = false
let startX, startY
let lastX = 0
let lastY = 0
let mode = MODES.DRAW
let imageData

// EVENTS
$canvas.addEventListener("mousedown", startDrawing)
$canvas.addEventListener("mousemove", draw)
$canvas.addEventListener("mouseup", stopDrawing)
$canvas.addEventListener("mouseleave", stopDrawing)

$colorPicker.addEventListener("change", handleChangeColor)
$thicknessInput.addEventListener("input", handleThicknessChange)
$clearBtn.addEventListener("click", clearCanvas)

document.addEventListener("keydown", handleKeyDown)
document.addEventListener("keyup", handleKeyUp)

$fillBtn.addEventListener("click", () => {
  setMode(MODES.FILL)
})

$pickerBtn.addEventListener("click", () => {
  setMode(MODES.PICKER)
})

$eraseBtn.addEventListener("click", () => {
  setMode(MODES.ERASE)
})

$rectangleBtn.addEventListener("click", () => {
  setMode(MODES.RECTANGLE)
})

$ellipseBtn.addEventListener("click", () => {
  setMode(MODES.ELLIPSE)
})

$drawBtn.addEventListener("click", () => {
  setMode(MODES.DRAW)
})

$saveBtn.addEventListener("click", () => {
  setMode(MODES.SAVE)
})

// METHODS
function startDrawing(event) {
  isDrawing = true
  const { offsetX, offsetY } = event

  // Guardar las coordenadas iniciales
  ;[startX, startY] = [offsetX, offsetY]
  ;[lastX, lastY] = [offsetX, offsetY]

  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  // Si el modo es FILL, rellenara el canvas
  if (mode === MODES.FILL) {
    const fillColor = $colorPicker.value
    ctx.fillStyle = fillColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    isDrawing = false
  }
}

function draw(event) {
  if (!isDrawing) return

  const { offsetX, offsetY } = event

  if (mode === MODES.DRAW || mode === MODES.ERASE) {
    // comenzar un trazadod
    ctx.beginPath()

    // mover el trazadoa a las coordenadas actuales
    ctx.moveTo(lastX, lastY)

    // dibujar entre los puntos de coordenadas
    ctx.lineTo(offsetX, offsetY)

    ctx.stroke()

    // actualizar las últimas coordenadas
    ;[lastX, lastY] = [offsetX, offsetY]

    return
  }

  if (mode === MODES.RECTANGLE) {
    ctx.putImageData(imageData, 0, 0)
    let width = offsetX - startX
    let height = offsetY - startY

    if (isShiftPressed) {
      const sideLength = Math.min(Math.abs(width), Math.abs(height))
      width = width > 0 ? sideLength : -sideLength
      height = height > 0 ? sideLength : -sideLength
    }

    ctx.beginPath()
    ctx.rect(startX, startY, width, height)
    ctx.stroke()
    return
  }

  if (mode === MODES.ELLIPSE) {
    ctx.putImageData(imageData, 0, 0)
    let width = offsetX - startX
    let height = offsetY - startY

    if (isShiftPressed) {
      const radius = Math.min(Math.abs(width), Math.abs(height))
      width = width > 0 ? radius : -radius
      height = height > 0 ? radius : -radius
    }

    ctx.beginPath()
    ctx.ellipse(
      startX + width / 2,
      startY + height / 2,
      Math.abs(width) / 2,
      Math.abs(height) / 2,
      0,
      0,
      2 * Math.PI
    )
    ctx.stroke()
    return
  }
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

async function setMode(newMode) {
  let previousMode = mode
  mode = newMode
  $("button.active")?.classList.remove("active")

  if (mode === MODES.DRAW) {
    $drawBtn.classList.add("active")
    canvas.style.cursor = 'url("./assets/cursors/pincel.png") 0 24, auto'
    ctx.globalCompositeOperation = "source-over"
    ctx.lineWidth = $thicknessInput.value // usar el valor del input
    return
  }

  if (mode === MODES.RECTANGLE) {
    $rectangleBtn.classList.add("active")
    canvas.style.cursor = 'url("./assets/cursors/point.png") 0 24, auto'
    ctx.globalCompositeOperation = "source-over"
    ctx.lineWidth = $thicknessInput.value
    return
  }

  if (mode === MODES.ELLIPSE) {
    $ellipseBtn.classList.add("active")
    canvas.style.cursor = 'url("./assets/cursors/point.png") 0 24, auto'
    ctx.globalCompositeOperation = "source-over"
    ctx.lineWidth = $thicknessInput.value
    return
  }

  if (mode === MODES.ERASE) {
    $eraseBtn.classList.add("active")
    canvas.style.cursor = 'url("./assets/cursors/erase.png") 0 24, auto'
    ctx.globalCompositeOperation = "destination-out"
    ctx.lineWidth = 20
    return
  }

  if (mode === MODES.PICKER) {
    $pickerBtn.classList.add("active")
    const EyeDropper = new window.EyeDropper()
    try {
      const result = await EyeDropper.open()
      const { sRGBHex } = result
      ctx.strokeStyle = sRGBHex
      $colorPicker.value = sRGBHex
      setMode(previousMode)
    } catch (e) {
      // si ha habido un error o el usuario no ha recuperado ningún color
    }
    return
  }

  if (mode === MODES.FILL) {
    $fillBtn.classList.add("active")
    canvas.style.cursor = 'url("./assets/icons/fill.png") 0 24, auto'
  }

  if (mode === MODES.SAVE) {
    ctx.globalCompositeOperation = "destination-over"
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const link = document.createElement("a")
    link.href = canvas.toDataURL()
    link.download = "mi-draw.png"
    link.click()
    setMode(previousMode)
    return
  }
}

function handleKeyDown({ key }) {
  isShiftPressed = key === "Shift"
}

function handleKeyUp({ key }) {
  if (key === "Shift") isShiftPressed = false
}

function handleThicknessChange() {
  const thickness = $thicknessInput.value
  ctx.lineWidth = thickness
}

// INIT
setMode(MODES.DRAW)

// show picker if browser has support
if (typeof window.EyeDropper !== "undefined") {
  $pickerBtn.removeAttribute("disabled")
}
