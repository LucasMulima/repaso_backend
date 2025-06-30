import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { ListaTODOs, TODO } from "./data"

dotenv.config()
const app = express()
app.use(bodyParser.json())
const PORT = process.env.PORT

app.get("/",(req: Request, resp: Response)=>{
    resp.json("Endpoin raiz del TODOapp")
})

app.get("/todos",(req: Request, resp: Response)=>{
    const estado = req.query.estado

    const nuevalistatodos : TODO [] = []

    if(estado == undefined){
        resp.json(ListaTODOs)
        return
    }
    for (let p of ListaTODOs){
        if(p.estado.toString() == estado){
            nuevalistatodos.push(p)
        }
    }
    resp.json(nuevalistatodos)
})

app.post("/todos",(req: Request, resp: Response)=>{
    const todo = req.body
    if(todo == undefined){
        resp.status(400).json({
            msg:"no ingreso ningun campo"
        })
        return
    }

    if(todo.descripcion == undefined){
        resp.status(400).json({
            msg:"no ingreso descripcion"
        })
        return
    }

    ListaTODOs.push({
        id: ListaTODOs.length + 1,
        descripcion: todo.descripcion,
        estado: todo.estado
    })

    resp.json({
        msg: ""
    })
})

app.put("/todos",(req: Request, resp: Response)=>{
    const todo = req.body

    if(todo.id == undefined ){
        resp.status(400).json({
            msg:"debe enviar un id"
        })
        return
    }

    for(let p of ListaTODOs){
        if(p.id == todo.id){
            p.descripcion = todo.descripcion
            p.estado = todo.estado

            resp.json({
                msg: " "
            })
            return
        }
    }

    resp.status(400).json({
        msg: "debe enviar un id existente"
    })

})


app.delete("/todos/:id",(req: Request, resp: Response)=>{
    const id = req.params.id

    let indice : number | null = null
    let contador = 0
    for (let t of ListaTODOs){
        if(t.id.toString() == id){
            indice = contador
            break
        }
        contador++

    }


    if(indice == null){
        resp.status(400).json({
            msg: "no se encontro el todo, id inexistente"
        })
        return
    }
    ListaTODOs.splice(indice, 1)

    resp.json({
        msg:""
    })


})

app.listen(PORT, () => {
    console.log(`Server initialized in port ${PORT}`)
})

