import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import * as actions from '../store/actions/index';
import { connect } from "react-redux";
import Display from "./Display";

class Layout extends Component {

    componentDidMount() {
        this.props.onInitMovies();
        console.log(this.props.movies)
    }

    componentDidUpdate() {
        console.log(this.props.movies)
    }

    render() {
        return (
            <div className="container">
                <NavBar></NavBar>
                <Display propsToShow={this.props.movies}></Display>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        movies: state.mainStateReducer.movies,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitMovies: () => dispatch(actions.initMovies()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);