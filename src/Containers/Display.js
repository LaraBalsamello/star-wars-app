import React from "react";
import "./Display.scss";

const display = (props) => {
    let display = null;
    if (props.propsToShow) {
        display = (props.propsToShow.map((pr, index) => {
            if (pr.hasOwnProperty("title")) {
                return (<p key={index}>{pr.title}</p>)
            } else {
                return (<p key={index}>{pr.name}</p>)
            }
        }));
    }
    return (
        <div className="container-props">
            {display}
        </div>
    );
}

export default display;
