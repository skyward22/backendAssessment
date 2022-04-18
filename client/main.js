document.getElementById("fortuneButton").onclick = function () {
    axios.get("http://localhost:4000/api/fortune/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
};

const actorsContainer = document.querySelector('#actors-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/actors`

const actorsCallback = ({ data: actors }) => displayActors(actors)
const errCallback = err => console.log(err.response.data)

const getAllActors = () => axios.get(baseURL).then(actorsCallback).catch(errCallback)
const createActor = body => axios.post(baseURL, body).then(actorsCallback).catch(errCallback)
const deleteActor = id => axios.delete(`${baseURL}/${id}`).then(actorsCallback).catch(errCallback)
const updateActor = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(actorsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#actor-name')
    // let rating = document.querySelector('input[name="ratings"]:checked')
    const rating = document.querySelector('input[type=radio]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        name: name.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createActor(bodyObj)

    name.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createActorCard(actor) {
    const actorCard = document.createElement('div')
    actorCard.classList.add('actor-card')

    actorCard.innerHTML = `<img alt='actor cover' src=${actor.imageURL} class="actor-cover"/>
    <p class="actor-title">${actor.name}</p>
    <div class="btns-container">
        <button onclick="updateActor(${actor.id}, 'minus')">-</button>
        <p class="actor-rating">${actor.rating} stars</p>
        <button onclick="updateActor(${actor.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteActor(${actor.id})">delete</button>
    `


    actorsContainer.appendChild(actorCard)
}

function displayActors(arr) {
    actorsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createActorCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllActors()