package med.voll.api.controller;

import med.voll.api.domain.usuarios.Usuario;
import med.voll.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/api/usuario")
public class UsuarioController {

    @Autowired
    public UsuarioRepository usuarioRepository;

    @GetMapping("/{id}")

    public ResponseEntity<Usuario> getUser(@PathVariable Long id){
        Usuario usuario = usuarioRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(usuario);
    }
}
