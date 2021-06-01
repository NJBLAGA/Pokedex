const baseUrl = 'https://pokeapi.co/api/v2/'
const pokemonName = document.getElementById("pokemon-name")
const getPokemonButton = document.getElementById("get-pokemon-button")
getPokemonButton.addEventListener('click', getPokemon)


//grab the main element
const mainElement = document.getElementById("main-content")

//Grab the search input element
const searchElement = document.getElementById("search-input")



function updateNameHeading(name) {
    pokemonName.innerText = name
}

function createNewImage(url) {
    //Create a new image node
    const pokemonImage = document.createElement("img")
        //add img src
    pokemonImage.src = url
        //add an id
    pokemonImage.id = "pokemon-image"
        //attach it to DOM
    mainElement.appendChild(pokemonImage)

}

function addTypes(types) {
    console.log("Types:", types)
        //iterate over types array
    types.forEach(type => {
        //grab element.type.name
        const name = type.type.name
            // create a new DOM element using that name
        const typeElement = document.createElement("div")
            //add the name as text
        typeElement.innerText = `Type: ${name.toUpperCase(0)}`
            //add a general class name for type elements
        typeElement.classList.add("type")
            //add the type as a class
        typeElement.classList.add(name)
            //append the element to the parent
        mainElement.appendChild(typeElement)


    });
}

function clearExisting() {
    //remove the image
    const pokemonImage = document.getElementById("pokemon-image")
    if (pokemonImage) {
        //delete the element
        mainElement.removeChild(pokemonImage)
    }

    const typeElement = document.querySelectorAll(".type")
    if (typeElement.length > 0) {
        typeElement.forEach(element => mainElement.removeChild(element))
    }

}

async function getPokemon() {
    clearExisting()
    pokemonName.innerText = "...loading"
    const searchTerm = searchElement.value
    let data = null
    try {
        let response = await fetch(`${baseUrl}pokemon/${searchTerm}`);
        data = await response.json()
        updateNameHeading(data.name)
        if (data.sprites.other["official-artwork"].front_default) {
            //create and image element with this image
            createNewImage(data.sprites.other["official-artwork"].front_default)
        }
        addTypes(data.types)

    } catch (error) {
        console.log(error.message)
        updateNameHeading("Something, went wrong...")
    }
}