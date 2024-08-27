const $ = (el) => document.querySelector(el)
const $$ = (el) => document.querySelectorAll(el)

const imageInput = $("#image-input")
const itemsSection = $("#selector-items")

function createItem(src) {
  const imgElement = document.createElement("img")
  imgElement.draggable = true
  imgElement.src = src
  imgElement.className = "item-image"
  imgElement.addEventListener("dragstart", handleDragStart)
  imgElement.addEventListener("dragend", handleDragEnd)

  itemsSection.appendChild(imgElement)
  return imgElement
}

imageInput.addEventListener("change", (event) => {
  const [file] = event.target.files

  if (file) {
    const reader = new FileReader()
    reader.onload = (eventReader) => {
      createItem(eventReader.target.result)
    }
    reader.readAsDataURL(file)
  }
})

let draggendElement = null
let sourceContainer = null

const rows = $$(".tier .row")

rows.forEach((row) => {
  row.addEventListener("drop", handleDrop)
  row.addEventListener("dragover", handleDragOver)
  row.addEventListener("dragleave", handleDragLeave)
})

itemsSection.addEventListener("dragover", handleDragOver)
itemsSection.addEventListener("drop", handleDrop)
itemsSection.addEventListener("dragleave", handleDragLeave)

function handleDrop(event) {
  event.preventDefault()
  const { currentTarget, dataTransfer } = event
  if (sourceContainer && draggendElement) {
    sourceContainer.removeChild(draggendElement)
  }
  if (draggendElement) {
    const src = dataTransfer.getData("text/plain")
    const imgElement = createItem(src)
    currentTarget.appendChild(imgElement)
  }

  currentTarget.classList.remove("drag-over")
}

function handleDragOver(event) {
  event.preventDefault()
  const { currentTarget } = event
  if (sourceContainer === currentTarget) return
  currentTarget.classList.add("drag-over")
}
function handleDragLeave(event) {
  event.preventDefault()
  const { currentTarget } = event
  currentTarget.classList.remove("drag-over")
}

function handleDragStart(event) {
  draggendElement = event.target
  sourceContainer = draggendElement.parentNode
  event.dataTransfer.setData("text/plain", draggendElement.src)
}

function handleDragEnd(event) {
  draggendElement = null
  sourceContainer = null
}
