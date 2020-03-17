/****DOM ELEMENTS*****/
const entryList = document.querySelector("#bakes-container")
const listItem = document.querySelectorAll(".item")
const bakeForm = document.querySelector("#new-bake-form")


/****Listeners ******/
bakeForm.addEventListener("click", handleFormSubmit)
entryList.addEventListener('click', e=> {
    if(e.target.className === "item"){

    console.log("done");
    }
})

/*****THIS DID NOT WORK AS PLANNED */
/****Display In detail View ****/
function handleFormSubmit(event) {
    event.preventDefault()
    const newEntry = {
        "name": name,
        "image_url": image_url,
        "description": description
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
       
        console.log(newEntryData)

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