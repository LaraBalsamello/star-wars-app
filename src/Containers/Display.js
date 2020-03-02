import React from "react";
import "./Display.scss";
import Loader from "../Components/Loader/Loader";
import { connect } from "react-redux";

const display = (props) => {
    let display = null;
    let loadingMore = null;
    if (props.loading === false) {
        if (props.loadingMore) {
            loadingMore = (<p className="mini-p-load">Cargando más personajes . . .</p>);
        }
        display = (props.propsToShow.map((pr, index) => {
            if (pr.hasOwnProperty("title")) {
                return (<p className="cursor-pointer" onClick={() => props.click(pr)} key={index}>{pr.title}</p>)
            } else {
                return (<p className="cursor-pointer" onClick={() => props.click(pr)} key={index}>{pr.name}</p>)
            }
        }));
    } else {
        display = (<Loader></Loader>);
    }
    return (
        <div id="scrolling-el" onScroll={props.scrolling} className="container-props">
            {display}
            {loadingMore}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loadingMore: state.mainStateReducer.loadingMore,
    };
}

export default connect(mapStateToProps, null)(display);
