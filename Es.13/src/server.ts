import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { createPlanet, deleteById, getAll, getOneById, updateById } from "./controllers/planets.ts";

const app = express()
const port = 3000;

app.use(morgan("dev"))
app.use(express.json());

app.get('/api/planets', getAll)

app.get('/api/planets/:id', getOneById)

app.post('/api/planets', createPlanet)

app.put('/api/planets/:id', updateById)

app.delete('/api/planets/:id', deleteById)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})