export interface PacientCreate{
    nombre:string,
    email:string,
    telefono:string,
    documento:string,
    direccion:{
        calle:string,
        distrito:string,
        ciudad:string,
        numero:string,
        complemento:string
    }
}