// your code here!
console.log("🥧")

fetch("http://localhost:3000/bakes")
    .then(response => response.json())
    .then(bakeData => {
          renderAllBakes(bakeData)
    })
function renderAllBakes(inputBakes) {
         inputBakes.forEach(renderBake)
         debugger
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
           debugger
           renderBakeDetails(ev.target)
   })
}
function renderBakeDetails(bake) {
   const outerDiv = document.querySelector("div#detail")
   const innerDiv = document.createElement("div")
   innerDiv.innerHTML = `
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
    outerDiv.append(innerDiv)
}







