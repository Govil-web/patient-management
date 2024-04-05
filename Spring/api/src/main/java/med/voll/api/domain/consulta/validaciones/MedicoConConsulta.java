package med.voll.api.domain.consulta.validaciones;

import med.voll.api.domain.consulta.DatosAgendarConsulta;
import med.voll.api.infra.errores.ValidacionDeIntegridad;
import med.voll.api.repository.ConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MedicoConConsulta implements ValidadorDeConsultas{

    @Autowired
    private ConsultaRepository repository;

    public void validar(DatosAgendarConsulta datos){
        if(datos.idMedico()==null){
            return;
        }

        var medicoConConsulta = repository.existsByMedicoIdAndData(datos.idMedico(), datos.fecha());

        if(medicoConConsulta){
            throw new ValidacionDeIntegridad("Este medico ya tiene una consulta en ese horario");
        }

    }

}
