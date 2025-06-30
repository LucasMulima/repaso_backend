import express, { Request, Response, NextFunction, response } from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { listaproducto, producto } from "./data"


dotenv.config()
const app = express()
app.use(bodyParser.json())
const PORT = process.env.PORT

app.get("/", (req:Request, resp:Response) =>{
    resp.send("respuesta default del endpoint")
})

app.get("/ej2/:curso/:seccion", (req:Request, resp:Response) =>{
    const curso = req.params.curso
    const sec = req.params.seccion

})


app.get("/ej3", (req:Request, resp:Response) => {
    const curso = req.query.curso
    const sec = req.query.seccion

})



app.get("/products",(req:Request, resp: Response)=>{
    resp.json(listaproducto)
})

app.get("/products/search",(req:Request, resp: Response)=>{
    const name = req.query.name
    const maxPrice = req.query.maxPrice

    if(name == undefined){
        resp.status(400).json({
            msg: "no se definio la variable"
        })
        return
    }
    let nuevosProductos : producto[] = []
    if(maxPrice == undefined){
        resp.status(400).json({
            msg:"no se encuentra el precio"
        })
        return
    }
    for(let p of listaproducto){
        const productoname = p.name.toLocaleUpperCase()
        if(productoname.includes(name.toString().toUpperCase()) &&
            (p.price<= parseFloat(maxPrice.toString()))){
                nuevosProductos.push(p)

        }
    }

    resp.json(nuevosProductos)
})

app.get("/products/:id",(req:Request, resp: Response)=>{
    const id = req.params.id

    let productoEnc = null
    for(let p of listaproducto){
        if(p.id.toString() == id){

            productoEnc = p
            break;
        }
    }

    if(productoEnc == null){
        resp.status(400).json({
            msg:"no se encontro el producto"
        })
        return
    }else{
        resp.json(productoEnc)
        return
    }

})



app.listen(PORT, () => {
    console.log(`El server se inicio en el puerto ${PORT}`)
})
