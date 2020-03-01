import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import * as actions from '../store/actions/index';
import { connect } from "react-redux";
import Display from "./Display";
import "./Layout.scss";
import Image from '../logos/star-wars.png';
import { Characters } from "../models/characters";
import { Movie } from "../models/movie";
import SearchBox from "../Components/SearchBox/SearchBox";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Layout extends Component {

    constructor() {
        super();
        this.handleScroll = this.handleScroll.bind(this);
    }

    state = {
        showDetails: (
            <div>
                <h2>Los detalles de la pelicula o personaje seleccionado se mostrarán aquí</h2>
            </div>
        ),
        showMovies: false,
        showCharacters: false,
        dontDisplay: true,
        selected: null,
        message: 'not at bottom',
        height: window.innerHeight,
        charsFetch: 1,
    }

    handleScroll() {
        if (this.props.loadingChars === false) {
            let el = window.document.getElementById("scrolling-el");
            if ((el.scrollTop >= (el.scrollHeight - el.offsetHeight) - 10)) {
                this.setState({
                    message: 'bottom reached',
                });
                this.setState({ charsFetch: this.state.charsFetch + 1 })
                this.props.onNextChars(this.state.charsFetch);
            } else {
                this.setState({
                    message: 'not at bottom'
                });
            }
        }
    }

    componentDidMount() {
        this.props.onInitCharacters(this.state.charsFetch);
        this.props.onInitMovies();
    }

    catchSearch = (value) => {
        this.setState({ error: null })
        if (value.length > 0) {
            if (!this.state.hasResponse && this.state.showCharacters) {
                this.props.onSearchChars(value);
            } else {
                this.props.onSearchMovies(value);
            }
        } else if (value.length === 0) {
            if (this.state.showCharacters) {
                this.props.onInitCharacters(this.state.charsFetch);
            } else {
                this.props.onInitMovies();
            }
        }

    }

    clickHandler = (e) => {
        this.setState({ dontDisplay: false });
        if (e === "PELICULAS") {
            this.setState({
                showMovies: true,
                showCharacters: false,
                selected: "PELICULAS"
            })
        } else {
            this.setState({
                showCharacters: true,
                showMovies: false,
                selected: "PERSONAJES"
            })
        }
    }

    clickHandlerBackMenu = () => {
        if (this.props.error) {
            this.props.onCleanError();
        }
        this.setState({ dontDisplay: true })
    }

    clickHandlerDisplay = (e) => {
        let arrJSX = null;
        this.setState({ dontDisplay: true })
        if (e.name) {
            let character = new Characters(e.name, e.eye_color, e.height, e.mass, e.films);
            arrJSX = (
                <div className="details">
                    <div className="container-info">
                        <h2>Nombre:</h2> <p>{character.name}</p>
                    </div>
                    <div className="container-info">
                        <h3>Color de ojos:</h3> <p>{character.eye_color}</p>
                    </div>
                    <div className="container-info">
                        <h3>Peso:</h3><p>{character.height} kg</p>
                    </div>
                    <div className="container-info">
                        <h3>Altura:</h3> <p>{character.height} m</p>
                    </div>
                    {/* <p>Películas en las que participo: {character.eye_color}</p> */}
                </div>
            );
        } else {
            let movie = new Movie(e.title, e.episode_id, e.director, e.producer, e.release_date);
            arrJSX = (
                <div className="details">
                    <div className="container-info">
                        <h2>Nombre:</h2> <p> {movie.title}</p>
                    </div>
                    <div className="container-info">
                        <h3>Director:</h3> <p> {movie.director}</p>
                    </div>
                    <div className="container-info">
                        <h3>Productor:</h3> <p> {movie.producer}</p>
                    </div>
                    <div className="container-info">
                        <h3>Fecha de estreno:</h3> <p> {movie.release_date}</p>
                    </div>
                </div>
            );
        }
        this.setState({
            showDetails: (
                arrJSX
            )
        })
    }

    render() {
        let type;
        let display = null;
        let button = (
            <FontAwesomeIcon
                onClick={this.clickHandlerBackMenu}
                className="fontawesome-icon"
                icon={faArrowLeft}
            />
        );
        let search = (<SearchBox getSearch={this.catchSearch} />);
        if (this.props.error === false && this.state.showMovies && this.state.dontDisplay === false && this.props.loadingMovies === false) {
            type = (
                <div className="container-search">
                    <div className="flex-container-icon">
                        {button}
                        <h4>Películas</h4>
                    </div>
                    {search}
                </div>
            );
            display = (<Display loading={false} propsToShow={this.props.movies} click={this.clickHandlerDisplay}></Display>);
        } else if (this.props.error === false && this.state.showCharacters && this.state.dontDisplay === false && this.props.loadingMovies === false) {
            type = (
                <div className="container-search">
                    <div className="flex-container-icon">
                        {button}
                        <h4>Personajes</h4>
                    </div>
                    {search}
                </div>
            );
            display = (<Display scrolling={this.handleScroll} loading={false} propsToShow={this.props.characters} click={this.clickHandlerDisplay}></Display>);
        } else if (this.props.error === false) {
            if (this.props.loadingMovies && this.state.showMovies) {
                display = (<Display loading={true} click={this.clickHandlerDisplay}></Display>);
            }
            if (this.props.loadingChars && this.state.showCharacters) {
                display = (<Display loading={true} click={this.clickHandlerDisplay}></Display>);
            }
        } else if (this.props.error === true) {
            display = (
                <div>
                    {button}Hubo un error en el servidor o no se encontraron resultados. Vuelvalo a intentar en unos segundos
                </div>
            );
        }
        let classesForDetailsCont = "details-container";
        if (display === null) {
            classesForDetailsCont = classesForDetailsCont + " smaller-margin";
        }

        return (
            <div>
                <div className="toolbar-fixed">
                    <img src={Image} alt="" />
                </div>
                <div className="container">
                    <NavBar selected={this.state.selected} click={this.clickHandler}></NavBar>
                    <div className="search-display-container">
                        {type}
                        {display}
                    </div>
                    <div className={classesForDetailsCont}>
                        {this.state.showDetails}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        movies: state.mainStateReducer.movies,
        characters: state.mainStateReducer.characters,
        filteredChars: state.mainStateReducer.filteredChars,
        loadingChars: state.mainStateReducer.loadingChars,
        loadingMovies: state.mainStateReducer.loadingMovies,
        error: state.mainStateReducer.error,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitMovies: () => dispatch(actions.initMovies()),
        onInitCharacters: (e) => dispatch(actions.initCharacters(e)),
        onSearchChars: (value) => dispatch(actions.searchCharactersAPI(value)),
        onSearchMovies: (value) => dispatch(actions.searchMoviesAPI(value)),
        onPrevMovies: () => dispatch(actions.returnPrevMovies()),
        onPrevChars: () => dispatch(actions.returnPrevCharacters()),
        onNextChars: (e) => dispatch(actions.initCharacters(e)),
        onCleanError: () => dispatch(actions.cleanError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);