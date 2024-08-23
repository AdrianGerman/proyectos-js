const $ = (el) => document.querySelector(el)
const $$ = (el) => document.querySelector(el)

const ROWS = 10
const COLUMNS = 3

const range = (length) => Array.from({ length }, (_, i) => i)

const renderSpreadSheet = () => {
  const $table = $("table")
  const $head = $("thead")
  const $body = $("tbody")

  const headerHTML = `<tr>
    <th></th>
    ${range(COLUMNS)
      .map((i) => `<th>${i}</th>`)
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
          <span></span>
          <input type="text" value="" />
        </td>
        `
        )
        .join("")}
  </tr>`
    })
    .join("")

  $body.innerHTML = bodyHTML
}

renderSpreadSheet()
