// conexión a la API
import API_KEY from "./config.js"
const searchInput = document.querySelector(".search-input")
const contentSection = document.querySelector(".content-section")

// funcion para hacer la petición a la API
async function fetchGifs(searchQuery) {
  const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchQuery}&limit=12&offset=0&rating=g&lang=en`
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    displayGifs(data.data)
  } catch (error) {
    console.error(`Error en la obtención de los GIFs: `, error)
  }
}

// Función para mostrar los GIFs en la página
function displayGifs(gifs) {
  contentSection.innerHTML = "" // Limpiar la sección antes de mostrar nuevos resultados

  gifs.forEach((gif) => {
    const gifElement = document.createElement("div")
    gifElement.classList.add("gif-item")

    gifElement.innerHTML = `
        <img src="${gif.images.fixed_height.url}" alt="${gif.title}" />
      `

    contentSection.appendChild(gifElement)
  })
}

// Añadir evento al input para buscar cuando se presione Enter
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.trim()
    if (query !== "") {
      fetchGifs(query)
    }
  }
})
