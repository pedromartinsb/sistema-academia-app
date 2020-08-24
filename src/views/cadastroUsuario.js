import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'

import UsuarioService from '../app/service/usuarioService'
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: '',
        cpf: '',
        rg: '',
        dataNascimento: '',
        endereco: '',
        bairro: '',
        cep: '',
        cidade: '',
        uf: '',
        objetivo: '',
        profissao: '',
        estadoCivil: '',
        idade: '',
        debito: ''
    }

    constructor() {
        super()
        this.service = new UsuarioService()
    }

    validar() {
        const msgs = []

        if(!this.state.nome) {
            msgs.push('O campo Nome é obrigatório.')
        }

        if(!this.state.email) {
            msgs.push('O campo Email é obrigatório.')
        } else if (!this.state.email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('Informe um Email válido.')
        }

        if(!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push('Digite a senha 2x.')
        } else if (this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('As senhas não são iguais.')
        }

        if(!this.state.cpf) {
            msgs.push('O campo CPF é obrigatório.')
        }

        if(!this.state.rg) {
            msgs.push('O campo RG é obrigatório.')
        }

        if(!this.state.nome) {
            msgs.push('O campo Nome é obrigatório.')
        }

        if(!this.state.dataNascimento) {
            msgs.push('O campo Data Nascimento é obrigatório.')
        }

        if(!this.state.endereco) {
            msgs.push('O campo Endereço é obrigatório.')
        }

        if(!this.state.bairro) {
            msgs.push('O campo Bairro é obrigatório.')
        }

        if(!this.state.cep) {
            msgs.push('O campo CEP é obrigatório.')
        }

        if(!this.state.cidade) {
            msgs.push('O campo Cidade é obrigatório.')
        }

        if(!this.state.uf) {
            msgs.push('O campo UF é obrigatório.')
        } else if (this.state.uf.length > 2) {
            msgs.push('O campo UF deve conter 2 caracteres apenas.')
        }

        if(!this.state.objetivo) {
            msgs.push('O campo Objetivo é obrigatório.')
        }

        if(!this.state.profissao) {
            msgs.push('O campo Profissão é obrigatório.')
        }

        if(!this.state.estadoCivil) {
            msgs.push('O campo Estado Civil é obrigatório.')
        }

        if(!this.state.idade) {
            msgs.push('O campo Idade é obrigatório.')
        }

        if(!this.state.debito) {
            msgs.push('O campo Débito é obrigatório.')
        }

        return msgs
    }

    cadastrar = () => {
        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }

        const alunoDTO = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            cpf: this.state.cpf,
            rg: this.state.rg,
            dataNascimento: this.state.dataNascimento,
            endereco: this.state.endereco,
            bairro: this.state.bairro,
            cep: this.state.cep,
            cidade: this.state.cidade,
            uf: this.state.uf,
            objetivo: this.state.objetivo,
            profissao: this.state.profissao,
            estadoCivil: this.state.estadoCivil,
            idade: this.state.idade,
            debito: this.state.debito
        }

        this.service.salvarAluno(alunoDTO)
            .then( response => {
                mensagemSucesso('Aluno cadastrado com sucesso! Faça o login para acessar o sistema.')
                this.props.history.push('/login')
            }).catch( error => {
                mensagemErro(error.response.data)
            });
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                        id="inputNome"
                                        className="form-control" 
                                        name="nome"
                                        placeholder="Ex.: Maria da Silva" 
                                        onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" 
                                        id="inputEmail" 
                                        className="form-control" 
                                        name="email" 
                                        placeholder="Ex.: maria@email.com" 
                                        onChange={e => this.setState({email: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" 
                                        id="inputSenha" 
                                        className="form-control" 
                                        name="senha" 
                                        placeholder="Digite uma senha" 
                                        onChange={e => this.setState({senha: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" 
                                        id="inputRepitaSenha" 
                                        className="form-control" 
                                        name="senha" 
                                        placeholder="Repita a senha" 
                                        onChange={e => this.setState({senhaRepeticao: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="CPF: *" htmlFor="inputCPF">
                                <input type="number" 
                                        id="inputCPF" 
                                        className="form-control"
                                        name="cpf" 
                                        placeholder="Ex.: 000.000.000-00" 
                                        onChange={e => this.setState({cpf: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="RG: *" htmlFor="inputRG">
                                <input type="number" 
                                        id="inputRG" 
                                        className="form-control" 
                                        name="rg" 
                                        placeholder="Ex.: 0.000.000" 
                                        onChange={e => this.setState({rg: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Data de Nascimento: *" htmlFor="inputDataNascimento">
                                <input type="date" 
                                        id="inputDataNascimento" 
                                        className="form-control" 
                                        name="dataNascimento" 
                                        onChange={e => this.setState({dataNascimento: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Endereço: *" htmlFor="inputEndereço">
                                <input type="text" 
                                        id="inputDataNascimento" 
                                        className="form-control" 
                                        name="dataNascimento" 
                                        placeholder="Digite um endereço" 
                                        onChange={e => this.setState({endereco: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Bairro: *" htmlFor="inputBairro">
                                <input type="text" 
                                        id="inputBairro" 
                                        className="form-control"
                                        name="bairro" 
                                        placeholder="Digite um bairro" 
                                        onChange={e => this.setState({bairro: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="CEP: *" htmlFor="inputCEP">
                                <input type="text" 
                                        id="inputCEP" 
                                        className="form-control" 
                                        name="cep" 
                                        placeholder="Ex.: 00.000-00" 
                                        onChange={e => this.setState({cep: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Cidade: *" htmlFor="inputCidade">
                                <input type="text" 
                                        id="inputCidade" 
                                        className="form-control" 
                                        name="cidade" 
                                        placeholder="Digite uma cidade" 
                                        onChange={e => this.setState({cidade: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="UF: *" htmlFor="inputUF">
                                <input type="text" 
                                        id="inputUF" 
                                        className="form-control" 
                                        name="uf" 
                                        placeholder="Digite um UF" 
                                        onChange={e => this.setState({uf: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Objetivo: *" htmlFor="inputObjetivo">
                                <input type="text" 
                                        id="inputObjetivo" 
                                        className="form-control" 
                                        name="objetivo" 
                                        placeholder="Digite um objetivo" 
                                        onChange={e => this.setState({objetivo: e.target.value})} />
                            </FormGroup>
                            
                            <FormGroup label="Profissão: *" htmlFor="inputProfissao">
                                <input type="text" 
                                        id="inputProfissao" 
                                        className="form-control" 
                                        name="profissao" 
                                        placeholder="Ex.: Programador" 
                                        onChange={e => this.setState({profissao: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Estado Civil: *" htmlFor="inputEstadoCivil">
                                <input type="text" 
                                        id="inputEstadoCivil" 
                                        className="form-control" 
                                        name="estadoCivil" 
                                        placeholder="Ex.: Casado" 
                                        onChange={e => this.setState({estadoCivil: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Idade: *" htmlFor="inputIdade">
                                <input type="number" 
                                        id="inputIdade" 
                                        className="form-control" 
                                        name="idade" 
                                        placeholder="Digite uma idade" 
                                        onChange={e => this.setState({idade: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Débito: *" htmlFor="inputDebito">
                                <input type="number" 
                                        id="inputDebito" 
                                        className="form-control" 
                                        name="debito" 
                                        placeholder="Digite se o Aluno possuí débitos" 
                                        onChange={e => this.setState({debito: e.target.value})} />
                            </FormGroup>

                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">Cacelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter( CadastroUsuario )