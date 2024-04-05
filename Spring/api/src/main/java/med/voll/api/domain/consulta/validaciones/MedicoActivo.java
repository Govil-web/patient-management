package med.voll.api.domain.consulta.validaciones;

import med.voll.api.domain.consulta.DatosAgendarConsulta;
import med.voll.api.infra.errores.ValidacionDeIntegridad;
import med.voll.api.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class MedicoActivo implements ValidadorDeConsultas{

    @Autowired
    private MedicoRepository repository;
    public void validar(DatosAgendarConsulta datos){

        if(datos.idMedico()==null){
            return;
        }

        var medicoActivo= repository.findActivoById(datos.idMedico());
        if(!medicoActivo){
            throw new ValidacionDeIntegridad("No se permite agendar con medicos" +
                    " inactivos en el sistema");
        }
    }
}
