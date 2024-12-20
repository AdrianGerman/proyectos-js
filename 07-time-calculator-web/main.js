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
  console.log("Has realizado una conversión!")
}
