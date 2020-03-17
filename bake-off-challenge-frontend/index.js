//Set variables
const bakesCont = document.querySelector('#bakes-container')
const bakesDetail = document.querySelector('#detail')
const newBakeForm = document.querySelector('#new-bake-form')
//------Put bakes in sidebar------//
function renderAllBakeNames(bakeList) {
    bakeList.forEach(renderOneBakeName)
}

function renderOneBakeName(bake) {
    const outerLi = document.createElement('li')
    outerLi.className = "item"
    outerLi.dataset.id = `${bake.id}`
    outerLi.innerText = `${bake.name}`

    bakesCont.append(outerLi)
    outerLi.addEventListener("click", handleEntryClick)
}
//-----Show Bake-----//
function handleEntryClick(event) {
    bakeEntry = event.target
    fetchBake(bakeEntry).then(showBake)
}

function showBake(bake) {
    bakesDetail.innerHTML = `
    <img src=${bake.image_url} alt=${bake.name}>
    <h1>${bake.name}</h1>
    <p>${bake.description}</p>
    <form id="score-form" data-id="1">
    <input value=${bake.score} type="number" name="score" min="0" max="10" step="1">
    <input type="submit" value="Rate">
    </form>
    `
}
//------Create Bake------//
newBakeForm.addEventListener("submit", handleBakeSubmit)

function handleBakeSubmit(event) {
    event.preventDefault()
    
    const form = event.target
    newBakeName = form.childNodes[5].value
    newBakeImage = form.childNodes[9].value
    newBakeDes = form.childNodes[13].value

    newBake = {
        name: newBakeName,
        description: newBakeDes,
        image_url: newBakeImage,
        score: 0
    }
    postBake(newBake).then(renderOneBakeName)
}

//------Get All Bakes-----//
function fetchBakes() {
    return fetch(`http://localhost:3000/bakes`, {
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => data)
}
//------Get individual bakes------//
function fetchBake(bake) {
    //bake.id is undefined
    return fetch(`http://localhost:3000/bakes/${bake.dataset.id}`, {
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => data)
}
//------Post Bake------//
function postBake(newData) {
    return fetch(`http://localhost:3000/bakes`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then(res => res.json())
    .then(data => data)
}
//Initialize bakes
fetchBakes().then(renderAllBakeNames)

console.log("🥧")