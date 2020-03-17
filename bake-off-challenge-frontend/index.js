/****DOM ELEMENTS*****/
const entryList = document.querySelector("#bakes-container")
const listItem = document.querySelectorAll(".item")
const bakeForm = document.querySelector("#new-bake-form")
const detailDisplay = document.querySelector("#detail")

/****Listeners ******/
bakeForm.addEventListener("click", handleFormSubmit)
entryList.addEventListener('click', e=> {
    if(e.target.className === "item"){

    console.log("done");
    }
})

function itemDetail(item){
    detailDisplay.innerHTML = `
    <img src="${item.image_url}">
    <h1>${item.name}</h1>
    <p class="description">
      ${item.description}
    </p>
    <form id="score-form" data-id="1">
      <input value="${item.score}" type="number" name="score" min="0" max="10" step="1">
      <input type="submit" value="Rate">
    </form>
    `
}
/*****THIS DID NOT WORK AS PLANNED */
/****Display In detail View ****/
function handleFormSubmit(event) {
    event.preventDefault()
    const newEntry = {
        name: event.target['name'].value,
        image_url: event.target['image_url'].value,
        description: event.target['description'].value
    }
  
    fetch("http://localhost:3000/bakes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json" 
      },
      body: JSON.stringify(newEntry)
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error("Bad request")
        }
      })
      .then(newEntryData => {

        renderEntry(newEntryData)
      })
      .catch(error => alert(error))
  
  }

/****ENTRY RENDERING ****/
function renderEntry(item) {
    const entryLi = document.createElement('li')
    entryLi.className = "item"
    entryLi.dataset.id = item.id
    entryLi.innerText = `${item.name}`
    entryList.append(entryLi)
    entryLi.addEventListener('click', function (){
        itemDetail(item)
    })
  }
  
  function renderAllEntries(entries) {
    entries.forEach(renderEntry)
  }
  
  /**************** FETCH ALL DATA ****************/
  fetch("http://localhost:3000/bakes")
    .then(response => response.json())
    .then(bakeData => {
      renderAllEntries(bakeData)
    })

    
console.log("🥧")