import React from "react";
import history from "../util/history";
import defaultPoster from "../asset/default-poster.jpeg";

const Recommendation = (props) => {
    const defaultRecommendation = {
        url: defaultPoster,
        title: '工作细胞',
        id: '2333'
    }
    let recommendations = [defaultRecommendation, defaultRecommendation, defaultRecommendation, defaultRecommendation, defaultRecommendation]
    let i = 0;
    recommendations = props.recommendations || recommendations;
    return (
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
    )
}
export default Recommendation;