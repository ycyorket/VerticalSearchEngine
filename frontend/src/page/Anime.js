/* eslint-disable use-isnan */
import React from "react";
import SearchHeader from "../component/SearchHeader";
import AppFooter from "../component/AppFooter";
import Recommendation from "../component/Recommendation";
import defaultPoster from "../asset/default-poster.jpeg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import constant from "../util/constant";

const DataList = (props) => {
    const allData = props.allData;
    let viewCount = allData['播放量'] || NaN;
    let subscriberCount = allData['追番人数'] || NaN;
    let score = allData['评分'] || NaN;
    let noData = isNaN(viewCount) && isNaN(subscriberCount) && isNaN(score);
    const Datum = (props) => {
        return (<div className="animepage-datum">
            {isNaN(props.value) && <div className="animepage-datum-default">{props.default}</div>}
            {!isNaN(props.value) && <div className="animepage-datum-updated">
                    <p>{props.name}</p>
                    <p>{props.value}</p>
                </div>}
        </div>)
    }
    return(
        <div className="animepage-data">
            {noData && <div className="animepage-data-info">暂无番剧数据</div>}
            {!noData && <div className="animepage-datalist">
                <Datum name="总播放" value={viewCount} default="暂无播放量数据"/>
                <Datum name="追番人数" value={subscriberCount} default="暂无追番数据"/>
                <Datum name="评分" value={score} default="暂无评分数据"/>
            </div>}
        </div>
    )
}

const InfoList = (props) => {
    const allData = props.allData;
    return(
        <div className="animepage-infos">
            <ul className="animepage-infolist">
                {allData['开播时间']&&<li className="animepage-infolist-item">开播时间：{allData['开播时间']}</li>} 
                {allData['是否完结']&&<li className="animepage-infolist-item">状态：{allData['是否完结']}</li>} 
                {allData['制作公司']&&<li className="animepage-infolist-item">制作公司：{allData['制作公司']}</li>} 
                {allData['版权方']&&<li className="animepage-infolist-item">版权方：{allData['版权方']}</li>} 
            </ul>   
        </div>
    )
}

const Seiyuu = (props) => {
    const seiyuu = props.allData;
    let [expand, setExpand] = useState(false);
    
    return(<div className="animepage-seiyuu">
        <div className="seiyuulist-title">角色声优</div>
        {seiyuu && 
        <ul className="seiyuulist">
            {Object.keys(seiyuu).map((item, index)=>{
                if(expand||index<8)
                    return <li className="seiyuulist-item" key={'seiyuu'+seiyuu[item]}>{`${item}：${seiyuu[item]}`}</li>
                else
                    return null
            })}
        </ul>}
        {seiyuu && Object.keys(seiyuu).length >= 8 && <div className="animepage-expand" onClick={()=>{setExpand(!expand)}}>
            {expand&&'收起'} {!expand&&'展开更多'}
        </div>}
        {!seiyuu &&  <div className="nocontent-info">暂无声优数据</div>}
    </div>)
}

const Staff = (props) => {
    const staff = props.allData;
    let [expand, setExpand] = useState(false);

    return(
        <div className="animepage-staff">
            <div className="stafflist-title">STAFF</div>
            {staff && 
            <ul className="stafflist">
                {Object.keys(staff).map((item, index)=>{
                    if(expand||index<6)
                        return <li className="stafflist-item" key={'seiyuu'+staff[item]}>{`${item}：${staff[item]}`}</li>
                    else
                        return null
                })}
            </ul>}
            {staff && Object.keys(staff).length >= 6 && <div className="animepage-expand" onClick={()=>{setExpand(!expand)}}>
                {expand&&'收起'} {!expand&&'展开更多'}
            </div>}
            {!staff && <div className="nocontent-info">
                <div className="animepage-staff-info">暂无staff数据</div>
            </div>}
        </div>
    )
}

const Anime = () => {
    const defaultAnime = {
        "中文名": "工作细胞 第二季",
        "日文名": "はたらく細胞 2期",
        "cover": defaultPoster,
        "播放量": 20000916,
        "追番人数": 4000715,
        "评分": 4.0,
        "简介": '这是关于你的故事。是在你体内的故事——。人类的细胞数量，约为37兆个（新说）。细胞们在名为身体的世界中，今天也在精神满满无休无眠地工作...',
        "开播时间": '2021年1月10日',
        "制作公司": "david production",
        "版权方": "david production",
        "是否完结": "已完结",
        "角色声优": {'红细胞': '花泽香菜', '白细胞（中性粒细胞）': '前野智昭', '杀伤性T细胞/记忆T细胞': '小野大辅', '巨噬细胞': '井上喜久子', '血小板': '长绳麻理亚', '血小板（反帽子酱）': '石见舞菜香', '巨核细胞': '甲斐田裕子', '记忆细胞': '中村悠一', 'B细胞': '千叶翔也', '肥大细胞': '川澄绫子', 'NK细胞': '行成桃姬', '树突状细胞': '冈本信彦', '辅助T细胞': '樱井孝宏', '调节T细胞': '早见沙织', '一般细胞': '小林裕介', '乳酸菌（黑）': '吉田有里', '乳酸菌（红）': '高桥李依', '乳酸菌（熊猫）': '藤原夏海', '乳酸菌（斑）': '久保由利香', '癌细胞': '石田彰', '旁白': '能登麻美子'},
        "staff": {'原作': '清水茜（讲谈社《月刊少年天狼星》连载）', '监督': '小仓宏文', '系列构成、剧本': '柿原优子', '角色设计': '吉田隆彦', '细菌角色设计、道具设计、动作作画监督': '三室健太', '次要角色设计': '玉置敬子', '总作画监督': '吉田隆彦、玉置敬子、北尾胜', '美术监督': '细井友保（Studio Tulip）', '美术设定': '曾野由大', '色彩设计': '水野爱子', '摄影监督': '大岛由贵', '3DCG监督': '石井规仁', '编辑': '广濑清志（editz）', '音响监督': '明田川仁', '音响制作': 'Magic Capsule', '音乐': '末广健一郎、MAYUKO', '动画制作人': '若松刚', '动画制作': 'david production', '制作': 'ANIPLEX、讲谈社、david production'}
    }
    const defaultAnime2 = {
        "中文名": "工作细胞 第二季",
        "日文名": "はたらく細胞 2期",
        "cover": defaultPoster
    }
    let [anime, setAnime] = useState(defaultAnime);
    let id = useParams().id || "";
    useEffect(()=>{
        axios.post('http://localhost:5000/getAnimeInfo', { "id": id }, { headers: { "Content-Type": "application/json" }})
        .then( res => { 
            console.log(res)
            let data = res.data
            data['cover'] = constant.urlProcess(data['cover'])
            data['角色声优'] = constant.jsonify(data['角色声优'])
            data['staff'] = constant.jsonify(data['staff'])
            setAnime(data)
        })
        .catch( res => { console.log(res)})
    }, [])
    return (<div className = "pinkbackground">
        <SearchHeader/>
        <div className = "animepage">
            <div className = "animepage-left">
                <div className="animepage-info">
                    <div className="animepage-info-left">
                        <img className="animepage-poster" src={anime['cover']} alt={anime['中文名']+"海报"}/>
                    </div>
                    <div className="animepage-info-right">
                        <div className="animepage-zhongwen">{anime['中文名']}</div>
                        <div className="animepage-nihongo">{anime['日文名']}</div>
                        <DataList allData={anime}/>
                        {anime['简介']&&<div className="animepage-intro">{`简介：${anime['简介']}`}</div>}
                        <InfoList allData={anime}/>
                    </div>
                </div>
                <div className="animepage-recommendation">
                    <Recommendation/>
                </div>
            </div>
            <div className = "animepage-right">
                <Seiyuu allData={anime['角色声优']}/>
                <Staff allData={anime['staff']}/>
            </div>
        </div>
        <AppFooter styleClass="normal-footer" />
    </div>)
}

export default Anime;