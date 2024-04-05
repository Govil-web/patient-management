package med.voll.api.domain.consulta.validaciones;

import med.voll.api.domain.consulta.DatosAgendarConsulta;
import med.voll.api.infra.errores.ValidacionDeIntegridad;
import med.voll.api.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PacienteActivo implements ValidadorDeConsultas{

    @Autowired
    private PacienteRepository repository;
    public void validar(DatosAgendarConsulta datos){

        if(datos.idPaciente()==null){
            return;
        }

        var pacienteActivo= repository.findActivoById(datos.idPaciente());
         if(!pacienteActivo){
             throw new ValidacionDeIntegridad("No se permite agendar con pacientes" +
                     " inactivos en el sistema");
         }
    }
}
