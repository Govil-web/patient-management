import { Especialidad } from "./Especialidad"

export interface DoctorCreate{
    nombre: string,
	email: string,
	documento: string,
	telefono: string,
	especialidad: Especialidad,
	direccion: {
        calle:string,
        distrito:string,
        ciudad:string,
        numero:string,
        complemento:string
	}
}