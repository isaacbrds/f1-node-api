import fastify from "fastify"
import cors from "@fastify/cors"

const server  = fastify({logger: true});
server.register(cors, {
  origin: "*"
})
const teams = [
  {id: 1, name: "Maclaren"},
  {id: 2, name: "Ferrari"},
]

const drivers = [
  {id: 1, name: "Louis Hamilton"},
  {id: 2, name: "Michael Shumaker"},
]
server.get("/teams", async (req, res)=>{
  res.type("application/json").code(200)
  return {teams}
})
interface TeamParam {
  id: string;
}

server.get<{Params: TeamParam}>("/teams/:id",async(req, res)=>{
  const id = parseInt(req.params.id)
  const team = teams.find(team => team.id === id)
   if(team){
    res.type("application/json").code(200)
    return {team}
   }else{
    res.type("application/json").code(404)
    return {message: "Team not found"}
   }
})

server.get("/drivers", async(req, res)=>{
  res.type("application/json").code(200)
  return {drivers}
})
interface DriverParams{
  id: string;
}
server.get<{Params: DriverParams}>("/drivers/:id", async(req, res)=>{
  const id = parseInt(req.params.id);
  const driver = drivers.find(driver => driver.id === id)
  if(driver){
    res.type("application/json").code(200)
    return { driver}
  }else{
    res.type("application/json").code(404)
    return { message: "Driver not found"}
  }
})

server.listen({port: 3333}, ()=>{
  console.log('Server initialized!')
})