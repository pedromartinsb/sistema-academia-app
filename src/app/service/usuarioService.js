import ApiService from '../apiservice'

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    obterAlunos(id) {
        return this.get(`/${id}/alunos`)
    }

    salvarAluno(alunoDTO) {
        return this.post('/alunos', alunoDTO)
    }

}

export default UsuarioService;