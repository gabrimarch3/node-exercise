import express from "express";
import "express-async-errors";
import morgan from "morgan";
import Joi from "joi";

const app = express()
const port = 3000;

app.use(morgan("dev"))
app.use(express.json());

type Planet = {
    id: number,
    name: string,
  };

  type Planets = Planet[];

  let planets: Planets = [
    {
      id: 1,
      name: "Earth"
    },
    {
      id: 2,
      name: "Mars"
    },
  ];

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required()
});


app.get('/api/planets', (req, res) => {
  res.status(200).json(planets)
})

app.get('/api/planets/:id', (req, res) => {
  const {id} = req.params;
  const planet = planets.find(item => item.id === Number(id))
  res.status(200).json(planet)
})

app.post('/api/planets', (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id, name }
  const validateNewPlanet = planetSchema.validate(newPlanet);
  if(validateNewPlanet.error){
    return res.status(400).json({msg: validateNewPlanet.error.details[0].message})
  } else {
    planets = [...planets, newPlanet]
    res.status(201).json({msg: "Il pianeta è stato creato"})
  }
  console.log(planets)
})

app.put('/api/planets/:id', (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const validateUpdatedPlanet = planetSchema.validate(id);
  if(validateUpdatedPlanet.error){
    return res.status(400).json({msg: validateUpdatedPlanet.error.details[0].message})
  } else {
    planets = planets.map((planet) => planet.id === Number(id) ? {...planet, name} : planet)
    res.status(200).json({msg: 'Il pianeta è stato aggiornato'})
  }
  console.log(planets)
})

app.delete('/api/planets/:id', (req, res) => {
  const { id } = req.params;
  planets = planets.filter(planet => planet.id !== Number(id));
  console.log(planets)
  res.status(200).json({msg: 'Il pianeta è stato cancellato'})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})