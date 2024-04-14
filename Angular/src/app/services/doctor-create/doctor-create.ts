export interface DoctorCreate{
    nombre: string,
	email: string,
	documento: string,
	telefono: string,
	especialidad: string,
	direccion: {
        calle:string,
        distrito:string,
        ciudad:string,
        numero:string,
        complemento:string
	}
}