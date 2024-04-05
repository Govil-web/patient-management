package med.voll.api.domain.consulta.validaciones;

import med.voll.api.domain.consulta.DatosAgendarConsulta;
import med.voll.api.infra.errores.ValidacionDeIntegridad;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
@Component
public class HorarioDeFuncionamientoClinica implements ValidadorDeConsultas{

    public void validar(DatosAgendarConsulta datos){

        var domingo = DayOfWeek.SUNDAY.equals(datos.fecha().getDayOfWeek());
        var antesDeHoraDeApertura = datos.fecha().getHour()<7;
        var despuesDeHorarioDeCierre = datos.fecha().getHour()>19;
        if(domingo || antesDeHoraDeApertura || despuesDeHorarioDeCierre){
            throw new ValidacionDeIntegridad(
                  "El horario de atencion de la clinica" +
                          "es de lunes a sabado de 07:00 a 19:00 horas"
            );
        }

    }
}
