import React from "react";
import { useParams } from "react-router-dom";
import SearchHeader from "../component/SearchHeader";
import AppFooter from "../component/AppFooter";
import history from "../util/history";
import Recommendation from "../component/Recommendation";
import axios from "axios";
import { useState } from "react";

const NoSearchResult = (props) => {
    const keyword = props.keyword;
    return (<div className="searchpage-content">
        <article className="searchpage-info">
            <h1>抱歉没有找到与“<strong>{keyword}</strong>”相关的番剧(┬┬﹏┬┬)</h1>
            <h2>温馨提示：</h2>
            <p>请检查您的输入是否正确</p>
            <Recommendation/>
        </article>
    </div>)
}

const SorrySearch = () => {
    let keyword = useParams().keyword || "";
    if(keyword === "")
        history.push("/search");
    
    return (<div className = "searchpage pinkbackground">
            <SearchHeader keyword={keyword}/>
            <NoSearchResult keyword={keyword}/>
            <AppFooter styleClass="normal-footer" />
    </div>)

}

export default SorrySearch;