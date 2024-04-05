package med.voll.api.repository;

import med.voll.api.domain.consulta.DatosAgendarConsulta;
import med.voll.api.domain.paciente.Paciente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    Page<Paciente> findByActivoTrue(Pageable paginacion);

    @Query("""
           select p.activo
           from Paciente p
           where p.id=:idPaciente
           """)
    Boolean findActivoById(Long idPaciente);
}
