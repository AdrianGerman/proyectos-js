const $ = (el) => document.querySelector(el)
const $$ = (els) => document.querySelectorAll(el)

const imageInput = $("#image-input")
const itemsSection = $("#selector-items")

imageInput.addEventListener("change", (event) => {
  const [file] = event.target.files

  if (file) {
    const reader = new FileReader()
    reader.onload = (eventReader) => {
      const imgElement = document.createElement("img")
      imgElement.src = eventReader.target.result
      imgElement.className = "item-image"
      itemsSection.appendChild(imgElement)
    }
    reader.readAsDataURL(file)
  }
})
