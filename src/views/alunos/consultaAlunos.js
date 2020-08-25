import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import AlunosTables from './alunosTable'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import AlunoService from '../../app/service/alunoService'

import * as messages from '../../components/toastr'

class ConsultaAlunos extends React.Component {

    state = {
        alunos : [],
        professores : [],
        professor: ''
    }

    constructor() {
        super();
        this.service = new AlunoService()
    }

    componentDidMount() {
        this.buscarTodos()
    }

    cadastrarNovo = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    buscarTodos = () => {
        this.service
            .buscarTodos()
            .then( resposta => {
                this.setState({ alunos: resposta.data})
                this.setState({ professores: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    buscarPorIdUsuario = () => {
        this.service
            .buscarPorIdUsuario(this.state.professor)
            .then( resposta => {
                this.setState({ alunos: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    editar = (id) => {
        console.log(id)
    }

    deletar = ( aluno ) => {
        this.service
            .deletar(aluno.id)
            .then( response => {
                const alunos = this.state.alunos
                const index = alunos.indexOf(aluno)
                alunos.splice(index, 1)
                this.setState(alunos)
                messages.mensagemSucesso('Aluno deletado com sucesso.')
            }).catch( error => {
                messages.mensagemErro('Erro ao tentar deletar o Aluno.')
            })
    }

    render() {

        const professores = [
            { label: 'Selecione...', value: '' }
        ]

        this.state.professores.map( professor => {
            return (
                professores.push({ label: professor.nome, value: professor.id })
            )
        });

        return (
            <Card title="Consulta Alunos">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <button onClick={this.cadastrarNovo} type="button" className="btn btn-primary">Cadastrar Novo</button>

                            <br />
                            <br />
                            <FormGroup htmlFor="inputProfessores" label="Professores: ">
                                <SelectMenu id="inputProfessores" className="form-control" lista={professores} onChange={e => this.setState({professor: e.target.value})} />
                            </FormGroup>

                            <button onClick={this.buscarPorIdUsuario} type="button" className="btn btn-success">Buscar</button>
                            <button onClick={this.buscarTodos} type="button" className="btn btn-danger">Buscar Todos</button>

                            <br />
                            <br />
                            <AlunosTables alunos={this.state.alunos} 
                                          deletar={this.deletar}
                                          editar={this.editar} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter( ConsultaAlunos )