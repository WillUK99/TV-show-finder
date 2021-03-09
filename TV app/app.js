// putting selectors in variables
const showsInput = document.querySelector(".showsInput");
const searchBtn = document.querySelector(".searchBtn")
const resultContainer = document.querySelector("section")

//When input term is searched this ecent listener fires
searchBtn.addEventListener("click", async function (event) {
    event.preventDefault();
    // if input field is blank null is returned 
    if (showsInput == null || showsInput === "") return
    searchTerm = showsInput.value
    console.log(searchTerm)
    //search term is added onto end of tv api via string template literal
    const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`)
    //createDiv func is invoked and the response data from above is passed through with the invoked function 
    createDiv(res.data)
})


function createDiv(shows) {
    // clears results on new search
    clear()
    //for of loop loops through the response data from axios which has been passed through. creating a div with contents of the data.
    for (let show of shows) {
        const showDiv = document.createElement("div")
        const showImg = document.createElement("img")
        const showTitle = document.createElement("p")
        const showScore = document.createElement("p")
        //if no image data on response then a frog img is displayed
        //this stops the request from stopping if no data can be found
        if(!show.show.image) {
            showImg.src = "https://www.thesprucepets.com/thmb/lebTbFgP_kUDX_KefarQNaCn6MY=/1500x1500/smart/filters:no_upscale()/GettyImages-175174320-581251b65f9b58564ccaffe2.jpg"
        } else {
            //if img data can be found then the medium img size will be set as img src.
            showImg.src = show.show.image.medium
        }
        showTitle.innerText = show.show.name
        showScore.innerText = `Rating ${Math.floor(show.score)}/30`
        
        //appending img's, p's and div to reuslt container
        showDiv.appendChild(showImg)
        showDiv.appendChild(showTitle)
        showDiv.appendChild(showScore)
        resultContainer.appendChild(showDiv)
    }
}

const clear = () => {
    // clears all results when invoked
    resultContainer.innerHTML = null;
}
