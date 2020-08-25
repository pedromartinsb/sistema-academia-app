import ApiService from '../apiservice'

export default class AlunoService extends ApiService {

    constructor() {
        super('/api/alunos')
    }

    buscarTodos() {
        return this.get('')
    }

    buscarPorIdUsuario(id) {
        return this.get(`/${id}/usuarios`)
    }
}