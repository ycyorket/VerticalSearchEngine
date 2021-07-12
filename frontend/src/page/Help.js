import React from "react";
import AppHeader from "../component/AppHeader";
import AppFooter from "../component/AppFooter";

const Help = () => {
    return(<div className="pinkbackground">
        <AppHeader/>
        <article className="article"> 
            <h1>{"番查查 使用帮助"}</h1>
            <h2>2021-07-09</h2>
            <h3>{"番查查 的用法"}</h3>
            <p>{'与其他您习惯使用的搜索引擎类似，番查查 的搜索也是通过搜索框发起的。'}</p>
        </article>
        <AppFooter styleClass="normal-footer"/>
    </div>);
}

export default Help;