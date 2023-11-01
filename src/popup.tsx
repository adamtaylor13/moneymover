import React from "react";
import ReactDOM from "react-dom";

const Popup = () => {
    return (
        <>
            Hello! Check back here later, currently the pop-up menu has no functionality.
        </>
    );
};


ReactDOM.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    document.getElementById("root")
);
