import React from 'react'

import AvaliacoesChart from './avaliacoesChart'
var CanvasJSReact = require('../../assets/canvasjs.react')
var CanvasJSChart = CanvasJSReact.CanvasJSChart

export default props => {

    console.log(props.avaliacoes)

    const rows = props.avaliacoes.map( avaliacao => {
        console.log(avaliacao)
        return (
            <tr key={avaliacao.id}>
                <td>{avaliacao.aluno.nome}</td>
                <td>{avaliacao.avaliador}</td>
                <td>{avaliacao.dataAvaliacao[2]}/{avaliacao.dataAvaliacao[1]}/{avaliacao.dataAvaliacao[0]}</td>
                <td>{avaliacao.desempenho.altura}</td>
                <td>{avaliacao.desempenho.gorduraCorporal}</td>
                <td>
                    {/* <button type="button" 
                            className="btn btn-primary"
                            onClick={e => props.editar(avaliacao.id)}>
                                Editar
                    </button> */}
                    <button type="button" 
                            className="btn btn-danger" 
                            onClick={e => props.deletar(avaliacao.id)}>
                                Deletar
                    </button>
                </td>
            </tr>
        )
    })

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        title:{
            text: "Simple Column Chart with Index Labels"
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: [
                { x: 10, y: 71 },
                { x: 20, y: 55 },
                { x: 30, y: 50 },
                { x: 40, y: 65 },
                { x: 50, y: 71 },
                { x: 60, y: 68 },
                { x: 70, y: 38 },
                { x: 80, y: 92, indexLabel: "Highest" },
                { x: 90, y: 54 },
                { x: 100, y: 60 },
                { x: 110, y: 21 },
                { x: 120, y: 49 },
                { x: 130, y: 36 }
            ]
        }]
    }

    /* const avaliacoesChart = props.avaliacoes.map( avaliacao => {
        return (
            <AvaliacoesChart avaliacao={avaliacao} />
        )
    }) */

    const avaliacoesChart = <AvaliacoesChart avaliacoes={props.avaliacoes} />

    return (
        <>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Avaliador</th>
                    <th scope="col">Data Avaliação</th>
                    <th scope="col">Altura</th>
                    <th scope="col">Gordura Corporal</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
        </table>

<<<<<<< HEAD
        <div>
			<CanvasJSChart options = {options} />
		</div>

=======
>>>>>>> 2f62da735e13f6aea126f005a9e22e6ddfc2d74c
        {/* {avaliacoesChart} */}
        </>
    )
}