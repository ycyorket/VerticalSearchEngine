import React from "react";
import history from "../util/history";

const AppHeader = () => {
    return (
        <div className="appheader-container" onClick={()=>{history.push("/")}}>
            <div className="appheader-logo"/>
            <div className="appheader-logo2"/>
            <div className="appheader-right"/>
        </div>
    )
}
export default AppHeader;