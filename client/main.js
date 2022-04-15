
document.getElementById("fortuneButton").onclick = function () {
    axios.get("http://localhost:4000/api/actors/")
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
const updateActor = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(actorCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#actor-name')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        names: names.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createActor(bodyObj)

    names.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createActorCard(actor) {
    const actorCard = document.createElement('div')
    actorCard.classList.add('actor-card')

    actorCard.innerHTML = `<img alt='actor cover' src=${actor.imageURL} class="actor-cover"/>
    <p class="actor-title">${actor.title}</p>
    <div class="btns-container">
        <button onclick="updateActor(${actor.id}, 'minus')">-</button>
        <p class="actor-rating">${actor.rating} stars</p>
        <button onclick="updateActor(${actor.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteActor(${actor.id})">delete</button>
    `


    ActorsContainer.appendChild(actorCard)
}

function displayActors(arr) {
    actorsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createActorCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllActors()