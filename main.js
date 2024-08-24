const $ = (el) => document.querySelector(el)
const $$ = (el) => document.querySelector(el)

const $table = $("table")
const $head = $("thead")
const $body = $("tbody")

const ROWS = 10
const COLUMNS = 5
const FIRST_CHAR_CODE = 65

const range = (length) => Array.from({ length }, (_, i) => i)
const getColumn = (i) => String.fromCharCode(FIRST_CHAR_CODE + i)

let STATE = range(COLUMNS).map((i) =>
  range(ROWS).map((j) => ({ computedValue: j, value: j }))
)

console.log(STATE)

const renderSpreadSheet = () => {
  const headerHTML = `<tr>
    <th></th>
    ${range(COLUMNS)
      .map((i) => `<th>${getColumn(i)}</th>`)
      .join("")}
  </tr>`

  $head.innerHTML = headerHTML

  const bodyHTML = range(ROWS)
    .map((row) => {
      return `<tr>
      <td>${row + 1}</td>
      ${range(COLUMNS)
        .map(
          (column) => `
        <td data-x="${column}" data-y="${row}">
          <span>${STATE[column][row].computedValue}</span>
          <input type="text" value="${STATE[column][row].value}" />
        </td>
        `
        )
        .join("")}
  </tr>`
    })
    .join("")

  $body.innerHTML = bodyHTML
}

$body.addEventListener("click", (event) => {
  const td = event.target.closest("td")
  if (!td) return

  const { x, y } = td.dataset
  const input = td.querySelector("input")
  const span = td.querySelector("span")

  const end = input.value.length
  input.setSelectionRange(end, end)
  input.focus()
})

renderSpreadSheet()
