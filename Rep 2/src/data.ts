export interface TODO {
    id: Number,
    descripcion: String,
    estado: Number
}

export const ListaTODOs : TODO [] = [
    {
        id : 1,
        descripcion : "dormir",
        estado: 1
    },
    {
        id : 2,
        descripcion : "comer",
        estado: 0
    }
]
