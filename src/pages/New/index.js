import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';

import { Link } from 'react-router-dom';

export default function New( {history }){
    const [thumbnail, setThumbnail] = useState(null);
    const [nome, setNome] = useState('');
    const [sinopse, setSinopse] = useState('');
    const [situacao, setSituacao] = useState('');
    const [idioma, setIdioma] = useState('');
    const [duracao, setDuracao] = useState('');
    const [orcamento, setOrcamento] = useState('');
    const [receita, setReceita] = useState('');
    const [lucro, setLucro] = useState('');
    const [generos, setGeneros] = useState('');
    const [movie, setMovie] = useState('');
    const [pontuacao, setPontuacao] = useState('');
    const [dataLancamento, setDataLancamento] = useState('');


    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        }, [thumbnail])

    async function handleSubmit(event){
        event.preventDefault();

        const data = new FormData();

        data.append('thumbnail', thumbnail);
        data.append('nome', nome);
        data.append('sinopse', sinopse);
        data.append('situacao', situacao);
        data.append('idioma', idioma);
        data.append('duracao', duracao);
        data.append('orcamento', orcamento);
        data.append('receita', receita);
        data.append('lucro', lucro);
        data.append('generos', generos);
        data.append('movie', movie);
        data.append('pontuacao', pontuacao);
        data.append('data_lancamento', dataLancamento);

        await api.post('/movies', data)

        history.push('/');
    }
    return (
        <>
            <div className="bread-crumb">
                <Link to="/" className="home-link">Início / </Link>
                <span>Cadastro</span>
            </div>
            <form className="cadastro" onSubmit={handleSubmit}>
                <label
                id="thumbnail"
                style={{backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''}
                >
                    <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                    <img src={camera} alt="Select img" />
                </label>
                <label htmlFor="nome">Título do Filme</label>
                <input
                    id="nome"
                    placeholder="Título do filme"
                    value={nome}
                    onChange={ event => setNome(event.target.value)}
                />
                <label htmlFor="situacao">Situação do filme <span>(Lançado ou Pendente)</span></label>
                <input
                    id="situacao"
                    placeholder="Situação do filme"
                    value={situacao}
                    onChange={ event => setSituacao(event.target.value)}
                />
                <label htmlFor="sinopse">Sinopse do filme</label>
                <textarea
                    id="sinopse"
                    placeholder="Breve sinopse do filme (máximo de caracteres 250)"
                    value={sinopse}
                    onChange={ event => setSinopse(event.target.value)}
                    maxLength="250"
                />
                <label htmlFor="idioma">Idioma</label>
                <input
                    id="idioma"
                    placeholder="Idioma do filme"
                    value={idioma}
                    onChange={ event => setIdioma(event.target.value)}
                />
                <label htmlFor="duracao">Duração do filme <span>(Ex.: 2h e 40min)</span></label>
                <input
                    id="duracao"
                    placeholder="Duração do filme"
                    value={duracao}
                    onChange={ event => setDuracao(event.target.value)}
                />
                <label htmlFor="orcamento">Oraçamento do filme</label>
                <input
                    id="orcamento"
                    placeholder="Orçamento do filme"
                    value={orcamento}
                    onChange={ event => setOrcamento(event.target.value)}
                />
                <label htmlFor="receita">Receita do filme</label>
                <input
                    id="receita"
                    placeholder="Receita do filme"
                    value={receita}
                    onChange={ event => setReceita(event.target.value)}
                />
                <label htmlFor="lucro">Lucro do filme</label>
                <input
                    id="lucro"
                    placeholder="Lucro do filme"
                    value={lucro}
                    onChange={ event => setLucro(event.target.value)}
                />
                <label htmlFor="generos">Gêneros do filme <span>(Ex.: Ação, Fantasia, Aventura)</span></label>
                <input
                    id="generos"
                    placeholder="Gêneros do filme"
                    value={generos}
                    onChange={ event => setGeneros(event.target.value)}
                />
                <label htmlFor="movie">Link do trailer do filme <span>(Ex.: https://www.youtube.com/embed/jfVTJm9NilA)</span></label>
                <input
                    id="movie"
                    placeholder="Link do trailer"
                    value={movie}
                    onChange={ event => setMovie(event.target.value)}
                />
                <label htmlFor="pontuacao">Pontuação do filme <span>(Ex.: 75%)</span></label>
                <input
                    id="pontuacao"
                    placeholder="Pontuação do filme"
                    value={pontuacao}
                    onChange={ event => setPontuacao(event.target.value)}
                />
                <label htmlFor="dataLancamento">Data de lançamento do filme <span>(Ex.: 25/09/2019)</span></label>
                <input
                    id="dataLancamento"
                    placeholder="Data de lançamento do filme"
                    value={dataLancamento}
                    onChange={ event => setDataLancamento(event.target.value)}
                />
                <button type="submit" className="btn">Cadastrar</button>

            </form>
        </>
    )
}