export interface ListarConsulta {
    id: number;
    medico: {
      id: number;
      nombre: string;
      especialidad: string;
    };
    paciente: {
      id: number;
      nombre: string;
      documento: string;
    };
    data: number[];
    motivoCancelamiento: string;
  }