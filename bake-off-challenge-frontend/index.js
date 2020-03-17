// your code here!
let allBakeData;
fetch("http://localhost:3000/bakes")
    .then(response => response.json())
    .then(response => allBakeData = response)
    //.then(console.log)
    .then(renderAllBakes)

function renderOneBake(bake){
    //sidebar
    const bakeCont = document.querySelector("#bakes-container")
    const outerli = document.createElement("li")
    outerli.className = "item"
    outerli.id = bake.id
    outerli.textContent = bake.name
   
    bakeCont.append(outerli)
    //detail
    const detailCont = document.querySelector("#detail")
    const newsig = document.createElement("div")
    newsig.id = bake.id
    const detimg = document.createElement("IMG")
    detimg.src = bake.image_url
    const header = document.createElement("h1")
    header.textContent = bake.name
    const para = document.createElement("p")
    para.className = "description"
    para.textContent = bake.description
    
    detailCont.append(newsig,detimg,header,para)
}

function renderAllBakes(allBakeData){
    allBakeData.forEach(renderOneBake)
}

function handleFormSubmit(){
    document.querySelector("#new-bake-form")
    event.preventDefault

    const newname = form["name"].value
    const newimage_url = form["image_url"].value
    const newdescription = form["name"].value

    newcake = {
        name: newname,
        image_url: newimage_url,
        description: newdescription
    }
    
    fetch("http://localhost:3000/bakes",{
        method: "Post",
        headers: {"Content-Type": "application/json",
        },
        body: JSON.stringify(newcake),
        })
    renderOneBake(newcake)
}