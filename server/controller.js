let actors = require('./db.json');
let globalID = 6;

module.exports ={
    getActors: (req, res) => {
        res.status(200).send(actors)
    },
    deleteActor: (req, res) => {
        let index = actors.findIndex(elem => elem.id === +req.params.id);
        actors.splice(index, 1);
        res.status(200).send(actors)
    },
    createActor: (req, res) => {
        const {name, rating, imageURL} = req.body;
        let newActor = {
            id: globalID,
            name,
            rating,
            imageURL
        }
        actors.push(newActor);
        globalID++;
        res.status(200).send(actors)
    },
    updateActor: (req, res) => {
        const {id} = req.params;
        const {type} = req.body;
        let index = actor.findIndex(elem => +elem.id === +id);
        console.log(type);
        if(type === 'minus' && actor[index].rating > 0){
            actors[index].rating -= 1;
            res.status(200).send(actors);
        } else if(type === 'plus' && actors[index].rating < 5){
            actors[index].rating +=1;
            res.status(200).send(actors);
        }else{
            res.status(400).send('Something is wrong...')
        }
    }
}