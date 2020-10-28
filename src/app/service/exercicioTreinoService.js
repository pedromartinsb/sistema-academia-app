import ApiService from '../apiservice'

export default class ExercicioTreinoService extends ApiService {

    constructor() {
        super('/api/exercicioTreino')
    }

    buscarTodos() {
        return this.get('')
    }

    consultarPorTreino(treino) {
        return this.get(`/${treino}/treino`)
    }

    salvar(exercicioTreinoDTO) {
        return this.post('', exercicioTreinoDTO)
    }
}