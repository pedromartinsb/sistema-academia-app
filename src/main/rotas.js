import React from 'react'

import Login from '../views/login'
import Home from '../views/home'

import CadastroAlunos from '../views/alunos/cadastroAlunos'
import CadastroInstrutores from '../views/instrutores/cadastroInstrutores'

import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'
import ConsultaAlunos from '../views/alunos/consultaAlunos'
import ConsultaInstrutores from '../views/instrutores/consultaInstrutores'

import { Route, Switch, HashRouter } from 'react-router-dom'

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />

                <Route path="/cadastro-alunos" component={CadastroAlunos} />
                <Route path="/cadastro-instrutores" component={CadastroInstrutores} />

                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <Route path="/consulta-alunos" component={ConsultaAlunos} />
                <Route path="/consulta-instrutores" component={ConsultaInstrutores} />
            </Switch>
        </HashRouter>
    );
}

export default Rotas