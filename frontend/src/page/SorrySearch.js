import React from "react";
import { useParams } from "react-router-dom";
import SearchHeader from "../component/SearchHeader";
import AppFooter from "../component/AppFooter";
import history from "../util/history";
import defaultPoster from "../asset/default-poster.jpeg";

const NoSearchResult = (props) => {
    const keyword = props.keyword;
    const defaultRecommendation = {
        url: defaultPoster,
        title: '工作细胞',
        id: '2333'
    }
    const recommendations = [defaultRecommendation, defaultRecommendation, defaultRecommendation, defaultRecommendation, defaultRecommendation]
    let i = 0;
    return (<div className="searchpage-content">
        <article className="searchpage-info">
            <h1>抱歉没有找到与“<strong>{keyword}</strong>”相关的番剧(┬┬﹏┬┬)</h1>
            <h2>温馨提示：</h2>
            <p>请检查您的输入是否正确</p>
            <div className="recommendation">
                <div className="recommendation-title">番剧推荐</div>
                <div className="recommendation-content">
                    {recommendations.map((item)=>{
                        i += 1
                        return (<div key={"poster"+i} className="recommendation-item" onClick={()=>{history.push(`/anime/${item.id}`)}}>
                            <img className="recommendation-poster" src={item.url} alt={item.title+"海报"}/>
                            <h4 className="recommendation-anime">{item.title}</h4>
                        </div>)
                    })}
                </div>
            </div>
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