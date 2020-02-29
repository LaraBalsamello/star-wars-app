import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import * as actions from '../store/actions/index';
import { connect } from "react-redux";
import Display from "./Display";
import "./Layout.scss";

class Layout extends Component {

    state = {
        display: null
    }

    componentDidMount() {
        this.props.onInitMovies();
        this.props.onInitCharacters();
    }

    clickHandler = (e) => {
        if (e === "PELICULAS") {
            this.setState({
                display: (<Display propsToShow={this.props.movies}></Display>)
            })
        } else {
            this.setState({
                display: (<Display propsToShow={this.props.characters}></Display>)
            })
        }
    }

    render() {
        return (
            <div className="container">
                <NavBar click={this.clickHandler}></NavBar>
                <div className="search-display-container">
                    {this.state.display}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        movies: state.mainStateReducer.movies,
        characters: state.mainStateReducer.characters,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitMovies: () => dispatch(actions.initMovies()),
        onInitCharacters: () => dispatch(actions.initCharacters()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);