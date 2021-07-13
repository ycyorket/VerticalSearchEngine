import React from "react";
import AppHeader from "../component/AppHeader";
import AppFooter from "../component/AppFooter";

const Disconnected = () => {
    return(<div className="pinkbackground">
        <AppHeader/>
        <article className="article">
            <h1>{"网络连接失败，请重新尝试"}</h1>
        </article>
        <AppFooter styleClass="normal-footer"/>
    </div>);
}

export default Disconnected;