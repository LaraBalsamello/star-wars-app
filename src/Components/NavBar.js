import React, { Component } from "react";
import "./NavBar.scss";

class NavBar extends Component {

    state = {
        character: ["bla"]
    }


    render() {
        return (
            <div className="container-navbar">
                <p character={this.state.character[0]} onClick={() => this.props.click("PERSONAJES")}>Personajes</p>
                <p character={this.state.character[0]} onClick={() => this.props.click("PELICULAS")}>Películas</p>
            </div>
        );
    }
}

export default NavBar;