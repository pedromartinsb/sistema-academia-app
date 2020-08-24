import React from 'react'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localStorageService'

class Home extends React.Component {

    state = {
        alunos: 0
    }

    constructor() {
        super()
        this.usuarioService = new UsuarioService()
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        this.usuarioService
            .obterAlunos(usuarioLogado.id)
            .then( response => {
                this.setState({ alunos: response.data})
            }).catch( error => {
                console.log(error.response)
            });
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de academias.</p>
                <p className="lead">Você possui {this.state.alunos} alunos cadastrados.</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                       href="#/cadastro-usuarios" 
                       role="button"><i className="fa fa-users"></i>  
                       Cadastrar Aluno
                    </a>
                    <a className="btn btn-danger btn-lg" 
                       href="https://bootswatch.com/flatly/#" 
                       role="button"><i className="fa fa-users"></i>  
                       Cadastrar Plano de Treino
                    </a>
                </p>
            </div>
        )
    }
}

export default Home