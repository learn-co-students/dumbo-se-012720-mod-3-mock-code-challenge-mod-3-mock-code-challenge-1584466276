const bakesContainer = document.getElementById("bakes-container")
const detailDiv = document.getElementById("detail")
const createBakeForm = document.getElementById("new-bake-form")

const fetchBakes = () => {
    return fetch("http://localhost:3000/bakes")
    .then(response => response.json())
}

fetchBakes()
    .then(bakesData => {
        renderAllBakes(bakesData)
        renderDetailPage(bakesData[0])
    })

const renderAllBakes = (bakesData) => {
    bakesData.forEach(renderOneBakeToSideBar)
}

const renderOneBakeToSideBar = (bakeData) => {
    const bakeLi = document.createElement("li")
    bakeLi.className = "item"
    bakeLi.dataset.id = bakeData.id
    bakeLi.innerText = bakeData.name
    bakesContainer.append(bakeLi)
}

bakesContainer.addEventListener("click", event => {
    if (event.target.className === "item") {
        fetchBake(event.target.dataset.id)
    }
})

const fetchBake = (bakeId) => {
    return fetch(`http://localhost:3000/bakes/${bakeId}`)
        .then(response => response.json())
        .then(bakeData => renderDetailPage(bakeData))
}
const renderDetailPage = (bake) => {
    detailDiv.innerHTML = `
    <img src="${bake.image_url}" alt="${bake.name}">
    <h1>${bake.name}</h1>
    <p class="description">
        ${bake.description}
    </p>
    <form id="score-form" data-id="${bake.id}">
        <input value="${bake.score}" type="number" name="score" min="0" max="10" step="1">
        <input type="submit" value="Rate">
    </form>
    `
    document.getElementById("score-form").addEventListener("submit", event => {
        handleScoreFormSubmit(event, bake)
    })
}

const handleScoreFormSubmit = (event, bake) => {
    event.preventDefault()
    const newScore = event.target["score"].value
    const bakeId = event.target.dataset.id
    
    fetch(`http://localhost:3000/bakes/${bakeId}/ratings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 699a9ff1-88ca-4d77-a26e-e4bc31cfc261"
        },
        body: JSON.stringify({score: newScore})
    })
    .then(response => response.json())
    .then(updatedBakeData => {
        bake.score = updatedBakeData.score
    })
}


createBakeForm.addEventListener("submit", event => {
    handleCreateBakeFormSubmit(event)
})

const handleCreateBakeFormSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    newBake = {
        name: form["name"].value,
        description: form["description"].value,
        image_url: form["image_url"].value
    }
    createBake(newBake)
    .then(bakeData => {
        renderOneBakeToSideBar(bakeData)
        renderDetailPage(bakeData)
    })

    modal.style.display = "none"
    form.reset()
}

const createBake = (bake) => {
    return fetch("http://localhost:3000/bakes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bake)
    })
    .then(response => response.json())
}

