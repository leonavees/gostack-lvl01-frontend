import React, { useState, useEffect } from 'react';

import api from './services/api';

import './App.css';
// import backgroundImage from './assets/background.jpg';

import Header from './components/Header';

/**
 * Componente
 * Propriedade
 * Estado e Imutabilidade
 */

function App() {
    const [projects, setProjects] = useState([]);

    /**
     * useState retorna um array com 2 posições
     * 
     * 1. Variável com o seu valor inicial
     * 2. Função para atualizarmos esse valor
     */

     useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
     }, [])

    async function handleAddProject() {
        // setProjects([...projects, `Novo projeto ${Date.now()}`]);

        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Diego Fernandes'
        });
        
        setProjects([...projects, response.data]);
    }

    return (
        <>
            <Header title="Homepage" />

            {/* <img width={300} src={backgroundImage} alt="Background"/> */}

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    )
}

export default App;