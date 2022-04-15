const express = require("express");
const cors = require("cors");

const app = express();


app.use(express.json()); // When we want to be able to accept JSON.

app.use(cors());


app.get("/api/actors", (req, res) => {
  const compliments = ["A fresh start will put you on your way.",
           "A friend asks only for your time not your money.",
           "A friend is a present you give yourself.",
           "A gambler not only will lose what he has, but also will lose what he doesn’t have.",
           "A golden egg of opportunity falls into your lap this month."
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

const {getActors, deleteActor, createActor, updateActor} = require('./controller')

app.get('/api/actors', getActors)
app.delete('/api/actors/:id', deleteActor)
app.post('/api/actors', createActor)
app.put('/api/actors/:id', updateActor)


app.listen(4000, () => console.log("Server running on 4000"));
