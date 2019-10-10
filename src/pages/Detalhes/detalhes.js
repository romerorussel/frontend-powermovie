import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Detalhes(props){

    const [ movies, setMovies ] = useState({});
    const [generos, setGeneros ] = useState([]);

    useEffect(() => {
        const {movie_id} = props.match.params;

        async function loadDetails(id){
           const response = await api.get(`/details/?movie_id=${id}`);

           setMovies(response.data);
           setGeneros(response.data.generos);

        }

        loadDetails(movie_id);
    }, [props.match.params]);

    return (
        <>
            <div className="bread-crumb">
                <Link to="/" className="home-link">Início / </Link>
                <span>Detalhes</span>
            </div>
            
            <div className="grid-container-details">
                <div className="movie-container-right-details">
                    <h2 className="movie-title-info">
                        {movies.nome}
                    </h2>
                    <div className="sinopse-group">
                    <h4>Sinopse</h4>
                    <hr />
                    <p>
                        {movies.sinopse}
                    </p>
                    </div>
                    <div className="movie-informacoes">
                        <h4>Informações</h4>
                        <hr />
                        <table>
                            <thead>
                                <tr>
                                    <th>Situação</th>
                                    <th>Idioma</th>
                                    <th>Duração</th>
                                    <th>Orçamento</th>
                                    <th>Receita</th>
                                    <th>Lucro</th>
                                    <th>Lançamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{movies.situacao}</td>
                                    <td>{movies.idioma}</td>
                                    <td>{movies.duracao}</td>
                                    <td>R${movies.orcamento}</td>
                                    <td>R${movies.receita}</td>
                                    <td>R${movies.lucro}</td>
                                    <td>{movies.data_lancamento}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <ul className="info-list">
                        {generos.map(genero => (
                            <li>{genero}</li>
                        ))}
                    </ul>
                    <span className="movie-rating-info">
                            {movies.pontuacao}
                    </span>
                </div>
                
                <div className="item1">
                    <header style={{ backgroundImage: `url(${movies.thumbnail_url})` }} />
                </div>
            </div>
            <div className="video-trailer">
                <iframe style={{marginTop: '50px'}} width="900" height="600" src={movies.movie} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
        </>
    );
}