import React from "react";

const display = (props) => {
    let display = null;
    if (props.propsToShow) {
        display = (props.propsToShow.map(pr => {
            return (<p key={pr.episode_id}>{pr.title}</p>)
        }));
    }
    return (
        <div>
            {display}
        </div>
    );
}


export default display;