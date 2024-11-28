document.addEventListener("DOMContentLoaded", () => {
  function generateCheckboxes(containerId, groupName) {
    const container = document.getElementById(containerId)

    const labelsContainer = document.createElement("div")
    labelsContainer.className = `${groupName}-labels-container`

    for (let i = 1; i <= 5; i++) {
      const label = document.createElement("label")
      label.innerHTML = `
          <input type="checkbox" class="${groupName}-option" />
          ${i}
        `
      labelsContainer.appendChild(label)
    }

    const counterDisplay = document.createElement("div")
    counterDisplay.className = `${groupName}-counter-display`
    counterDisplay.textContent = `Seleccionados: 0`

    container.appendChild(labelsContainer)
    container.appendChild(counterDisplay)

    const checkboxes = labelsContainer.querySelectorAll(`.${groupName}-option`)
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selectedCount = Array.from(checkboxes).filter(
          (cb) => cb.checked
        ).length
        counterDisplay.textContent = `Seleccionados: ${selectedCount}`
      })
    })
  }

  generateCheckboxes("charizard-counter", "charizard")
  generateCheckboxes("mewtwo-counter", "mewtwo")
  generateCheckboxes("pikachu-counter", "pikachu")
})
