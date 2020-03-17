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
    outerLi.className = "bake-entry"
    outerLi.innerText = `${bake.name}`

    const hiddenID = document.createElement('p')
    hiddenID.innerText = `${bake.id}`
    hiddenID.style.display = 'none'
    outerLi.appendChild(hiddenID)

    bakesCont.append(outerLi)
    outerLi.addEventListener("click", handleEntryClick)
}
//-----Show Bake-----//
function handleEntryClick(event) {
    bakeEntry = event.target
    bakeEntryID = bakeEntry.childNodes[1].innerText
    fetchBake(bakeEntryID).then(showBake)
}

function showBake(bake) {
    console.log(bake)

    bakesDetail.innerHTML = `
    <img src=${bake.image_url} alt=${bake.name}>
    <h1>${bake.name}</h1>
    <p>${bake.description}</p>
    <input type="number" id="score" name="score" min="1" max="10" placeholder=${bake.score}>
    <button type="button">Rate</button>
    `
}
//------Create Bake------//
newBakeForm.addEventListener("submit", handleBakeSubmit)

function handleBakeSubmit(event) {
    event.preventDefault()
    console.log("you submitted")
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
function fetchBake(bakeID) {
    return fetch(`http://localhost:3000/bakes/${bakeID}`, {
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => data)
}
//------Post Bake------//
// function postBake() {
//     return fetch(`http://localhost:3000/bakes`, {
//         method: 'POST'
//         headers: {
//             'Content-type': 'application/json',
//             'Accept': 'application/json'
//         }
//     })
//     .then(res => res.json())
//     .then(data => data)
// }
//Initialize bakes
fetchBakes().then(renderAllBakeNames)

console.log("🥧")