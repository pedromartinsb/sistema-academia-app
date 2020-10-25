import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import NavbarAluno from '../../components/navbar-aluno'
import ExerciciosTable from './exerciciosTable'

import TreinoService from '../../app/service/treinoService'
import ExercicioService from '../../app/service/exercicioService'
import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'
import NavbarInstrutor from '../../components/navbar-instrutor'
import ExerciciosTableInstrutor from './exerciciosTableInstrutor'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class ConsultaExercicios extends React.Component {

    state = {
        exercicios: [],
        treinosAluno: [],
        treinoAluno: '',
        treinosInstrutor: [],
        treinoInstrutor: '',
        showConfirmDialog: false,
        exercicioDeletar: {}
    }

    constructor() {
        super();
        this.treinoService = new TreinoService()
        this.exercicioService = new ExercicioService()
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        if (usuarioLogado == null) {
            messages.mensagemAlerta('Por favor logar para acessar o sistema.')
            this.props.history.push('/login')
        } else if (usuarioLogado.tipoUsuario === 1) {
            this.buscarTodosTreinosPorAluno(usuarioLogado.id)
        } else if (usuarioLogado.tipoUsuario === 2) {
            this.buscarTodosTreinos()
        }       
    }

    cadastrarNovo = () => {
        this.props.history.push('/cadastro-exercicios')
    }

    buscarTodosTreinosPorAluno = (aluno) => {
        this.treinoService
            .consultarPorAluno(aluno)
            .then( resposta => {
                this.setState({ treinosAluno: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    buscarTodosTreinos = () => {
        this.exercicioService
            .buscarTodos()
            .then( resposta => {
                this.setState({ exercicios: resposta.data}) 
            }).catch( error => {
                console.log(error)
            })
    }

    editar = (id) => {
        console.log(id)
    }

    abrirConfirmacao = (treino) => {
        this.setState({ showConfirmDialog: true, treinoDeletar: treino })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, treinoDeletar: {} })
    }

    deletar = () => {
        this.exercicioService
            .deletar(this.state.exercicioDeletar)
            .then( response => {
                const exercicios = this.state.exercicios
                const index = exercicios.indexOf(this.state.exercicioDeletar)
                exercicios.splice(index, 1)
                this.setState({ exercicios: exercicios, showConfirmDialog: false })
                messages.mensagemSucesso('Exercício deletado com sucesso.')
            }).catch( error => {
                messages.mensagemErro('Erro ao tentar deletar o Exercício.')
            })
    }

    buscar = () => {
        if(!this.state.treinoAluno) {
            messages.mensagemErro('O preenchimento do campo Treino é obrigatório.')
            return false;
        }

        this.exercicioService
            .consultarPorTreino(this.state.treinoAluno)
            .then( resposta => {
                this.setState({ exercicios: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    abrirConfirmacao = (exercicio) => {
        this.setState({ showConfirmDialog: true, exercicioDeletar: exercicio })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, exercicioDeletar: {} })
    }

    editar = (exercicio) => {
        console.log(exercicio)
    }

    render() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        const treinos = [
            { label: 'Selecione...', value: '' }
        ]

        this.state.treinosAluno.map( treino => {
            return (
                treinos.push({ label: treino.nome, value: treino.id })
            )
        });

        if (usuarioLogado !== null) {
            if (usuarioLogado.tipoUsuario === 2) {
                return (
                    <>
                    <NavbarInstrutor />
                    <Card title="Consulta Exercícios">
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bs-component">
                                    <ExerciciosTableInstrutor exercicios={this.state.exercicios} 
                                                              editar={this.editar}
                                                              deletar={this.abrirConfirmacao} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Dialog header="Confirmação"
                                    visible={this.state.showConfirmDialog}
                                    style={{width: '50vw'}}
                                    footer={confirmDialogFooter}
                                    closeOnEscape={true}
                                    modal={true}
                                    onHide={() => this.setState({visible: false})}>
                                Confirma a exclusão do Exercício?
                            </Dialog>
                        </div>
                    </Card>
                    </>
                )
            } else {
                return (
                    <>
                    <NavbarAluno />
                    <Card title="Consulta Exercícios">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="bs-component">
                                    <FormGroup htmlFor="inputTreinos" label="Treinos: *">
                                        <SelectMenu id="inputTreinos" className="form-control" lista={treinos} onChange={e => this.setState({treinoAluno: e.target.value})} />
                                    </FormGroup>
        
                                    <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                                    <button onClick={this.buscarTodosTreinos} type="button" className="btn btn-primary">Buscar Todos</button>
                                </div>
                            </div>
                        </div>
        
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bs-component">
                                    <ExerciciosTable exercicios={this.state.exercicios} />
                                </div>
                            </div>
                        </div>
                    </Card>
                    </>
                )
            }
        }

    }
}

export default withRouter( ConsultaExercicios )