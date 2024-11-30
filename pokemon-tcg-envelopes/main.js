document.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.createElement("button")
  resetButton.textContent = "Resetear"
  resetButton.className = "reset-button"
  resetButton.style.display = "none"

  document.body.appendChild(resetButton)

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
    counterDisplay.textContent = `Abiertos: 0`

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
      checkAllSectionsCompleted()
    }

    function updateCounter() {
      const selectedCount = Array.from(checkboxes).filter(
        (cb) => cb.checked
      ).length
      counterDisplay.textContent = `Abiertos: ${selectedCount}`
    }

    function saveState() {
      const state = Array.from(checkboxes)
        .map((cb, index) => (cb.checked ? index + 1 : null))
        .filter((index) => index !== null)
      localStorage.setItem(`${groupName}-state`, JSON.stringify(state))
    }
  }

  function checkAllSectionsCompleted() {
    const allCheckboxes = document.querySelectorAll("input[type='checkbox']")
    const allChecked = Array.from(allCheckboxes).every((cb) => cb.checked)

    if (allChecked) {
      resetButton.style.display = "block"
    } else {
      resetButton.style.display = "none"
    }
  }

  function resetAll() {
    const allCheckboxes = document.querySelectorAll("input[type='checkbox']")
    allCheckboxes.forEach((checkbox) => {
      checkbox.checked = false
    })

    const groupNames = ["charizard", "mewtwo", "pikachu"]
    groupNames.forEach((groupName) => {
      const counterDisplay = document.querySelector(
        `.${groupName}-counter-display`
      )
      if (counterDisplay) {
        counterDisplay.textContent = "Abiertos: 0"
      }
      localStorage.removeItem(`${groupName}-state`)
    })

    resetButton.style.display = "none"
  }

  resetButton.addEventListener("click", resetAll)

  generateCheckboxes("charizard-counter", "charizard")
  generateCheckboxes("mewtwo-counter", "mewtwo")
  generateCheckboxes("pikachu-counter", "pikachu")

  checkAllSectionsCompleted()
})
