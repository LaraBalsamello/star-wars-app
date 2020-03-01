import React, { Component } from "react";
import "./NavBar.scss";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NavBar extends Component {

    state = {
        character: ["bla"]
    }


    render() {
        let icon1 = null;
        let icon2 = null;
        if (this.props.selected === "PELICULAS") {
            icon2 = (
                <FontAwesomeIcon
                    className="fontawesome-icon"
                    icon={faArrowRight} />
            );
        } else if (this.props.selected === "PERSONAJES") {
            icon1 = (
                <FontAwesomeIcon
                    className="fontawesome-icon"
                    icon={faArrowRight} />
            );
        }
        return (
            <div className="container-navbar">
                <p className="cursor-pointer" character={this.state.character[0]} onClick={() => this.props.click("PERSONAJES")}>Personajes{icon1}</p>
                <p className="cursor-pointer" character={this.state.character[0]} onClick={() => this.props.click("PELICULAS")}>Películas{icon2}</p>
            </div>
        );
    }
}

export default NavBar;