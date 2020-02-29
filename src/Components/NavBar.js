import React, { Component } from "react";
import "./NavBar.scss";
import Display from "../Containers/Display";

class NavBar extends Component {

    state = {
        character: ["bla"]
    }

    clickHandler = (param) => {
        console.log("display: ")
    }


    render() {
        return (
            <div className="container-navbar">
                <p character={this.state.character[0]} onClick={this.clickHandler("personajes")}>Personajes</p>
                <p character={this.state.character[0]} onClick={this.clickHandler("películas")}>Películas</p>
                <Display />
            </div>
        );
    }
}

export default NavBar;