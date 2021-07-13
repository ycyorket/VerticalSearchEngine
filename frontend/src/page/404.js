import React from "react";
import AppHeader from "../component/AppHeader";
import AppFooter from "../component/AppFooter";

const NotFound = () => {
    return(<div className="pinkbackground">
        <AppHeader/>
        <article className="article">
            <h1>{"404 not found! 你搜索的页面不存在！"}</h1>
        </article>
        <AppFooter styleClass="normal-footer"/>
    </div>);
}

export default NotFound;