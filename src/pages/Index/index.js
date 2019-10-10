import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination/pagination';
import './styles.css';

export default function Index(){
    const [ movies, setMovies ] = useState([]);
    const [ filters , setFilters ] = useState('');
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ moviesPerPage ] = useState(5);

    useEffect(() => {
        async function loadMovies(){
            const response = await api.get('/movies');
            setMovies(response.data);
        }
        loadMovies();
    }, []);

    //Get current movies
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovie = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    async function handleSubmit(event){
        event.preventDefault(); //Evita o funcionamento padrão do formulário.

        const response = await api.get('/movies', {
        headers: { filters }
        });

        setMovies(response.data);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="form-filter">
                    <input 
                    type="text"
                    id="filter"
                    placeholder="Digite o nome do filme aqui"
                    value={filters}
                    onChange={event => setFilters(event.target.value)}
                    />
                <button className="btn" type="submit">Pesquisar</button>
            </form>
            <ul>   
                {currentMovie.map(movie => (
                    <li key={movie.nome} style={{listStyle: 'none'}}>
                        <div className="grid-container" style={{marginBottom: '25px'}}>
                            <div className="item1">
                                <header style={{ backgroundImage: `url(${movie.thumbnail_url})` }} />
                            </div>
                            <div className="movie-container-right">
                                <h2 className="movie-title">
                                    {movie.nome}
                                </h2>

                                <span className="movie-rating">
                                    {movie.pontuacao}
                                </span>

                                <span className="movie-date">
                                    {movie.data_lancamento}
                                </span>

                                <p className="movie-resume">
                                    {movie.sinopse}
                                </p>

                                {movie.generos.map(genero => (
                                    <span key={genero} className="movie-genre">
                                        {genero}
                                    </span>
                                ))}
                                <Link to={`/detalhes/${movie._id}`} className="btn-details">Mais detalhes</Link>
                            </div>
                        </div>
                    </li>
                ))}
                <Pagination
                    moviesPerPage={moviesPerPage}
                    totalMovies={movies.length}
                    paginate={paginate}
                />
            </ul>
            
            
        </>
    );
}