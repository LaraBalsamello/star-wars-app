import React, { Component } from "react";
import "../SearchBox/SearchBox.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchBox extends Component {

    state = {
        valueInput: "",
        timer: 0
    };

    searchHandler = (e, duration) => {
        let durationSec = duration;
        clearTimeout(this.state.timer);
        this.setState({
            timer: setTimeout(() => {
                this.props.getSearch(this.state.valueInput);
            }, durationSec)
        });
        this.setState({ valueInput: e.target.value });
    }

    render() {
        return (
            <div className="search-box">
                <div className="search-container">
                    <div className="for-cursor" onChange={(e) => { this.searchHandler(e, 0) }}>
                        <FontAwesomeIcon
                            className="fontawesome-icon small-search-icon"
                            icon={faSearch} />
                    </div>
                    <input
                        placeholder="Buscar"
                        type="text"
                        value={this.state.valueInput}
                        onChange={(e) => { this.searchHandler(e, 1000) }} >
                    </input>

                </div>
            </div>
        )
    }
};

export default SearchBox; 
