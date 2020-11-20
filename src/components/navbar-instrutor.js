import React from 'react'

import NavbarItem from './navbarItem'

function NavbarInstrutor() {

    return (
         <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
             <div className="container">
                 <a href="#/home" className="navbar-brand">Home</a>
                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                 </button>
                 <div className="collapse navbar-collapse" id="navbarResponsive">
                     <ul className="navbar-nav">
                         <NavbarItem href="#/consulta-alunos" label="Consulta Alunos" />
                         <NavbarItem href="#/consulta-instrutores" label="Consulta Instrutores" />
                         <NavbarItem href="#/consulta-avaliacoes" label="Consulta Avaliação Física" />
                         <NavbarItem href="#/cadastro-exercicios-treino" label="Cadastro Exercícios Treino" />
                     </ul>
                 </div>
                 <a href="#/login" className="navbar-brand">Logout</a>
                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                 </button>
             </div>
         </div>
    )
}

export default NavbarInstrutor