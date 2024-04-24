package med.voll.api.controller;

import med.voll.api.domain.usuarios.Usuario;
import med.voll.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/api/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    public UsuarioRepository usuarioRepository;

    @PostMapping("/create")
    public ResponseEntity<Usuario> createUser(@RequestBody Usuario usuario){
        Usuario usuarioSalvo = usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuarioSalvo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUser(@PathVariable Long id){
        Usuario usuario = usuarioRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(usuario);
    }
}
