document.addEventListener("DOMContentLoaded", () => {
  function generateCheckboxes(containerId, groupName) {
    const container = document.getElementById(containerId)

    const labelsContainer = document.createElement("div")
    labelsContainer.className = `${groupName}-labels-container`

    for (let i = 1; i <= 5; i++) {
      const label = document.createElement("label")
      label.innerHTML = `
        <input type="checkbox" class="${groupName}-option" data-index="${i}" />
      `
      labelsContainer.appendChild(label)
    }

    const counterDisplay = document.createElement("div")
    counterDisplay.className = `${groupName}-counter-display`
    counterDisplay.textContent = `Seleccionados: 0`

    container.appendChild(labelsContainer)
    container.appendChild(counterDisplay)

    const checkboxes = labelsContainer.querySelectorAll(`.${groupName}-option`)

    const savedState =
      JSON.parse(localStorage.getItem(`${groupName}-state`)) || []
    checkboxes.forEach((checkbox, index) => {
      if (savedState.includes(index + 1)) {
        checkbox.checked = true
      }
      checkbox.addEventListener("change", () =>
        handleCheckboxChange(checkbox, index)
      )
    })

    updateCounter()

    function handleCheckboxChange(checkbox, index) {
      if (checkbox.checked) {
        if (index > 0 && !checkboxes[index - 1].checked) {
          checkbox.checked = false
          return
        }
      } else {
        for (let i = index + 1; i < checkboxes.length; i++) {
          checkboxes[i].checked = false
        }
      }

      updateCounter()

      saveState()
    }

    function updateCounter() {
      const selectedCount = Array.from(checkboxes).filter(
        (cb) => cb.checked
      ).length
      counterDisplay.textContent = `Seleccionados: ${selectedCount}`
    }

    function saveState() {
      const state = Array.from(checkboxes)
        .map((cb, index) => (cb.checked ? index + 1 : null))
        .filter((index) => index !== null)
      localStorage.setItem(`${groupName}-state`, JSON.stringify(state))
    }
  }

  generateCheckboxes("charizard-counter", "charizard")
  generateCheckboxes("mewtwo-counter", "mewtwo")
  generateCheckboxes("pikachu-counter", "pikachu")
})
