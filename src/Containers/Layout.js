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

class Layout extends Component {

    state = {
        showDetails: null,
        showMovies: false,
        showCharacters: false
    }

    componentDidMount() {
        this.props.onInitCharacters();
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
                this.props.onPrevChars();
            } else {
                this.props.onPrevMovies();
            }
        }

    }

    clickHandler = (e) => {
        if (e === "PELICULAS") {
            this.setState({
                showMovies: true,
                showCharacters: false
            })
        } else {
            this.setState({
                showCharacters: true,
                showMovies: false
            })
        }
    }

    clickHandlerDisplay = (e) => {
        let arrJSX = null;
        if (e.name) {
            let character = new Characters(e.name, e.eye_color, e.height, e.mass, e.films);
            arrJSX = (
                <div>
                    <h2>Nombre: {character.name}</h2>
                    <p>Color de ojos: {character.eye_color}</p>
                    <p>Peso: {character.height}</p>
                    {/* <p>Películas en las que participo: {character.eye_color}</p> */}
                </div>
            );
        } else {
            let movie = new Movie(e.title, e.episode_id, e.director, e.producer, e.release_date);
            arrJSX = (
                <div>
                    <h2>Nombre: {movie.title}</h2>
                    <p>Color de ojos: {movie.director}</p>
                    <p>Peso: {movie.producer}</p>
                    <p>Fecha  de estreno: {movie.release_date}</p>
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
        if (this.state.showMovies) {

            type = (<div className="container-search">
                <h4>Películas</h4>
                <SearchBox getSearch={this.catchSearch} />
            </div>);
            display = (<Display propsToShow={this.props.movies} click={this.clickHandlerDisplay}></Display>);
        } else if (this.state.showCharacters) {
            type = (<div className="container-search"><h4>Personajes</h4><SearchBox getSearch={this.catchSearch} /></div>);
            display = (<Display propsToShow={this.props.characters} click={this.clickHandlerDisplay}></Display>);
        }
        return (
            <div>
                <div className="toolbar-fixed">
                    <img src={Image} alt="" />
                </div>
                <div className="container">
                    <NavBar click={this.clickHandler}></NavBar>
                    <div className="search-display-container">
                        {type}
                        {display}
                    </div>
                    <div className="details-container">
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
        filteredChars: state.mainStateReducer.filteredChars
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitMovies: () => dispatch(actions.initMovies()),
        onInitCharacters: () => dispatch(actions.initCharacters()),
        onSearchChars: (value) => dispatch(actions.searchCharactersAPI(value)),
        onSearchMovies: (value) => dispatch(actions.searchMoviesAPI(value)),
        onPrevMovies: () => dispatch(actions.returnPrevMovies()),
        onPrevChars: () => dispatch(actions.returnPrevCharacters()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);