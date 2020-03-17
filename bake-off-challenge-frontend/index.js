// your code here!
console.log("🥧")
const newBakeForm = document.querySelector("form#new-bake-form")
newBakeForm.addEventListener("submit", handleSubmit)
let detailsRendered = 0
fetch("http://localhost:3000/bakes")
    .then(response => response.json())
    .then(bakeData => {
          renderAllBakes(bakeData)
    })
function renderAllBakes(inputBakes) {
         inputBakes.forEach(renderBake)
         detailsRendered = 1
         renderBakeDetails(inputBakes[0])
}
function renderBake(bake) {
   const outerUl = document.querySelector("ul#bakes-container")
   const innerLi = document.createElement("li")
   innerLi.dataset["id"] = bake.id
   innerLi.innerText = bake.name
   innerLi.className = "item"
   outerUl.append(innerLi)
   innerLi.addEventListener("click", (ev) => {
           renderBakeDetails(bake)
   })
}
function renderBakeDetails(bake) {
   const outerDiv = document.querySelector("div#detail")
   const innerHeader = outerDiv.firstElementChild
   innerHeader.innerHTML = `
    <img src=${bake.image_url} alt=${bake.name}>
    <h1>${bake.name}</h1>
    <p class="description">
       ${bake.description}
    </p>
    <form id="score-form" data-id=${bake.id}>
      <input value="10" type="number" name="score" min="0" max="10" step="1">
      <input type="submit" value="Rate">
    </form>
    `
    innerHeader.className = ""
    if (detailsRendered === 0) {
        outerDiv.append(innerHeader)
    }
    const rateForm = innerHeader.querySelector("form#score-form")
    rateForm.addEventListener("submit", updateRating)
}
function handleSubmit(event) {
    const newBake = {
         name:  event.target.name.value,
         image_url:  event.target.image_url.value,
         description:  event.target.description.value,
         score: 0
        }
    debugger
    fetch("http://localhost:3000/bakes", {
       method: "POST",
       headers: {
                  "Content-Type": "application/json"
                },
       body: JSON.stringify(newBake)
    })
    .then(response => response.json())
    .then(newBakeData => {
      debugger
      renderBake(newBakeData)
      newBakeForm.reset()
    })



}

function updateRating(event) {
    debugger



}
