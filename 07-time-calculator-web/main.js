function updateClock() {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const seconds = now.getSeconds().toString().padStart(2, "0")
  document.getElementById("clock").innerText = `${hours}:${minutes}:${seconds}`
}

setInterval(updateClock, 1000)
updateClock()

function handleKeyPress(event) {
  if (event.key === "Enter") {
    calculateTime()
  }
}

function calculateTime() {
  const now = new Date()
  const timeToAdd = document.getElementById("timeToAdd").value

  const timeParts = timeToAdd.split(":")
  if (timeParts.length !== 2 || isNaN(timeParts[0]) || isNaN(timeParts[1])) {
    document.getElementById("result").innerText =
      "Por favor, ingrese un tiempo válido en formato hh:mm."
    return
  }

  const hoursToAdd = parseInt(timeParts[0])
  const minutesToAdd = parseInt(timeParts[1])

  if (minutesToAdd >= 60) {
    document.getElementById("result").innerText =
      "Por favor, ingrese un número de minutos menor a 60."
    return
  }

  const futureTime = new Date(
    now.getTime() + hoursToAdd * 60 * 60 * 1000 + minutesToAdd * 60 * 1000
  )

  const formaTime = (date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const period = hours >= 12 ? "PM" : "AM"
    hours = hours % 12 || 12
    return `${hours}:${minutes} ${period}`
  }

  const currentTimeFormatted = formaTime(now)
  const futureTimeFormatted = formaTime(futureTime)

  document.getElementById(
    "result"
  ).innerText = `Hora actual: ${currentTimeFormatted}\nHora futura: ${futureTimeFormatted}`
}
