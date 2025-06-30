import express, { Request, Response } from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { profile, profilelist } from "./data"


dotenv.config()
const app = express()
app.use(bodyParser.json())
const PORT = process.env.PORT

app.get("/", (req:Request, resp:Response)=>{
    resp.json("Endpoint base del sitio")
})

app.get("/visit", (req:Request, resp:Response)=>{
    const visit : profile = {
        id: profilelist.length,
        timestamp: new Date().toISOString()
    }

    profilelist.push(visit)


    resp.json({
        msg: "Gracias por visitar",
        Numero_de_visitas : profilelist.length
    })
})
app.get("/visits", (req:Request, resp:Response)=>{
    resp.json(profilelist)
})

app.delete("/visits/:id", (req:Request, resp:Response)=>{
    const id = req.params.id

    if(id==undefined){
        resp.status(400).json({
            msg: "no introduje un id"
        })
        return
    }
    let profilefound : number | null = null
    for(let p of profilelist){
        if(p.id.toString() == id){
            profilefound = p.id
        }
    }

    if(profilefound == null){
        resp.status(400).json({
            msg:"Id no encontrada"
        })
        return
    }
    profilelist.splice(profilefound,1)
    resp.json({
        msg: "visita eliminada"
    })

})

app.put("/visits", (req:Request,resp:Response)=>{
    const visit = req.body
    const id = req.query.id

    if(id==undefined){
        resp.status(400).json({
            msg:"debe indicar un id"
        })
        return
    }


    for(let p of profilelist){
        if(id==p.id.toString()){
            p.timestamp = visit.timestamp
            resp.json(p)
            return
        }
    }
    
})

app.listen(PORT, () => {
    console.log(`Server initialized in port ${PORT}`)
})

