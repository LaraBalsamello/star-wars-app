import React from "react";
import "./Display.scss";
import Loader from "../Components/Loader/Loader";

const display = (props) => {
    let display = null;
    if (props.loading === false) {
        display = (props.propsToShow.map((pr, index) => {
            if (pr.hasOwnProperty("title")) {
                return (<p onClick={() => props.click(pr)} key={index}>{pr.title}</p>)
            } else {
                return (<p onClick={() => props.click(pr)} key={index}>{pr.name}</p>)
            }
        }));
    } else {
        display = (<Loader></Loader>);
    }
    return (
        <div id="scrolling-el" onScroll={props.scrolling} className="container-props">
            {display}
        </div>
    );
}

export default display;
