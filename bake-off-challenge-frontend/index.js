const sidebarBakes = document.querySelector('#bakes-container')
const displayArea = document.querySelector('#detail')
const newBakeForm = document.querySelector('#modal')

fetch("http://localhost:3000/bakes")
  .then(response => response.json())
  .then(bakeData => {
    renderBakes(bakeData)
  })

function renderBakes(bakes){
    bakes.forEach(renderBake)
    switchBake(bakes[0])
    console.log("🥧")
}

function renderBake(bakeObj){
    const bakeLi = document.createElement('li')
    bakeLi.className = "item"
    bakeLi.dataset.id = bakeObj.id
    bakeLi.innerText = `${bakeObj.name}`
    sidebarBakes.append(bakeLi)
    bakeLi.addEventListener('click', function (){
        switchBake(bakeObj)
    })
}

function switchBake(bakeObj){
    displayArea.innerHTML = `
    <img src="${bakeObj.image_url}">
    <h1>${bakeObj.name}</h1>
    <p class="description">
      ${bakeObj.description}
    </p>
    <form id="score-form" data-id="1">
      <input value="${bakeObj.score}" type="number" name="score" min="0" max="10" step="1">
      <input type="submit" value="Rate">
    </form>
    `
}

newBakeForm.addEventListener("submit", handleFormSubmit)

function handleFormSubmit(event){
    event.preventDefault()
    const newBake = {
        name: event.target['name'].value,
        image_url: event.target['image_url'].value,
        description: event.target['description'].value
    }
    fetch("http://localhost:3000/bakes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBake)
    })
    .then(response => {
        return response.json()
    })
    .then(jsonResponse => {
        renderBake(jsonResponse)
        modal.style.display = "none"
        switchBake(jsonResponse)
    })
}