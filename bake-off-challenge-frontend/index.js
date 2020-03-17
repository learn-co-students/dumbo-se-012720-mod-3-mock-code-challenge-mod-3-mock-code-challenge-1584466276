// DOM ELEMENTS
const bakesContainer = document.querySelector(".side-list")
const bakeDetailsDiv = document.querySelector("#detail")
const createBakeForm = document.querySelector("#new-bake-form")


// EVENT LISTENERS
// bakesContaier click event
bakesContainer.addEventListener("click", event => {
    if (event.target.className === "item") {
        fetchBake(event.target.dataset.id)
    }
})

// form submit event
createBakeForm.addEventListener("submit", handleCreateBakeFormSubmit)


// FETCHERS?
// fetch bake items, throw them to renderAllBakes
fetch("http://localhost:3000/bakes")
    .then(response => response.json())
    .then(bakesData => renderAllBakes(bakesData))

// fetch bake, throw it to renderDetailPage
const fetchBake = (bakeID) => {
    fetch(`http://localhost:3000/bakes/${bakeID}`)
    .then(response => response.json())
    .then(bakeData => renderDetailPage(bakeData))
}


// EVENT HANDLERS
function handleCreateBakeFormSubmit(event) {
    event.preventDefault()

    form = event.target

    const newBake = {
        name: form["name"].value,
        description: form["description"].value,
        image_url: form["image_url"].value
    }

    fetch("http://localhost:3000/bakes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBake)
    })
    .then(response => response.json())
    .then(newBakeData => renderOneBake(newBakeData))

    form.reset()
}


// RENDER HELPERS
// renders all bake items, render bakes one by one using renderOneBake
const renderAllBakes = (bakes) => {
    bakes.forEach(renderOneBake)
}

// renders one bake item
const renderOneBake = (bake) => {
    const bakeLI = document.createElement("li")
    bakeLI.className = "item"
    bakeLI.dataset.id = bake.id
    bakeLI.textContent = `${bake.name}`
    bakesContainer.append(bakeLI)
}

//  show bake on detail page
const renderDetailPage = (bake) => {
    bakeDetailsDiv.innerHTML = `
    <img src="${bake.image_url}" alt="${bake.name}">
    <h1>${bake.name}</h1>
    <p class="description">"${bake.description}"</p>
    <form id="score-form" data-id="${bake.id}">
        <input value="10" type="number" name="score" min="0" max="10" step="1">
        <input type="submit" value="Rate">
    </form>
    `
}