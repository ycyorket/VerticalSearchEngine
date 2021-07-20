import React, { useState, useEffect, useContext }  from "react";
import history from "../util/history";
import defaultPoster from "../asset/default-poster.jpeg";
import axios from 'axios';
import constant from "../util/constant";
import context from "../util/context";

const Recommendation = (props) => {
    const defaultRecommendation = {
        cover: defaultPoster,
        name: '工作细胞',
        id: '2333'
    }
    const {name, tags} = useContext(context.anime);
    const [recommendations, setRecommendations] = useState(props.allData || [defaultRecommendation, defaultRecommendation, defaultRecommendation, defaultRecommendation, defaultRecommendation])

    useEffect(()=>{
        axios.post('http://localhost:5000/recommend', { "tags": tags || []}, { headers: { "Content-Type": "application/json" }})
        .then( res => { 
            let data = res.data
            data.forEach(item => {
                item['cover'] = constant.urlProcess(item['cover'])       
            });
            data = data.filter((item)=>{return item['name'] !== name});
            setRecommendations(data.slice(0, 5))
            console.log(name, tags, data)
        })
        .catch( res => { console.log(res)})
    }, [name, tags])
    
    let i = 0;

    return (
        <div className="recommendation">
            <div className="recommendation-title">番剧推荐</div>
            <div className="recommendation-content">
                {recommendations.map((item)=>{
                    i += 1
                    return (<div key={"poster"+i} className="recommendation-item" onClick={()=>{history.push(`/anime/${item.id}`)}}>
                        <img className="recommendation-poster" src={item.cover} alt={item.title+"海报"}/>
                        <h4 className="recommendation-anime">{item.name}</h4>
                    </div>)
                })}
            </div>
        </div>
    )
}
export default Recommendation;