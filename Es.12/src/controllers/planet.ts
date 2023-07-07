import { Request, Response } from "express";
import Joi from "joi";

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

const getAll = (req: Request, res: Response) => {
    res.status(200).json(planets)
};

const getOneById = (req: Request, res: Response) => {
    const {id} = req.params;
    const planet = planets.find(item => item.id === Number(id))
    res.status(200).json(planet)
};

const createPlanet = (req: Request, res: Response) => {
    const { id, name } = req.body;
    const newPlanet: Planet = { id, name }
    const validateNewPlanet = planetSchema.validate(newPlanet);
    if(validateNewPlanet.error){
      return res.status(400).json({msg: validateNewPlanet.error.details[0].message})
    } else {
      planets = [...planets, newPlanet]
      res.status(201).json({msg: "Il pianeta è stato creato"})
    }
    console.log(planets)
}

const updateById = (req: Request, res: Response) => {
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
  }

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    planets = planets.filter(planet => planet.id !== Number(id));
    console.log(planets)
    res.status(200).json({msg: 'Il pianeta è stato cancellato'})
}

export { getAll, getOneById, createPlanet, updateById, deleteById};