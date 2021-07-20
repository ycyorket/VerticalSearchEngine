import React, {useState} from "react";
import { useParams } from "react-router-dom";
import SearchHeader from "../component/SearchHeader";
import AppFooter from "../component/AppFooter";
import defaultPoster from "../asset/default-poster.jpeg";
import history from "../util/history";
import { useEffect } from "react";
import axios from "axios";
import constant from "../util/constant";

const Tag = (props) => {
    let [chosen, setChosen] = useState('全部');
    const type = props.taginfo.type;
    const name = props.taginfo.name;
    const values = props.taginfo.values;
    const setTags = props.setTags;
    return (<div className="tag-container">
        <div className="tag-title">{type}</div>
        <div className="tag-itemlist">
            {values.map(
                (item)=>
                <div key={name+'-'+item} className={item===chosen?"tag-item-chosen": "tag-item"} onClick={()=>{
                    setChosen(item);
                    const newTag = {};
                    console.log(item, chosen)
                    newTag[name] = item;
                    setTags(newTag);
                }}>{item}</div>
                )}
        </div>
    </div>)
}

const SortingBox = (props) => {
    let [ascend, setAscend] = useState(false)
    const reverse = () => {
        setAscend(!ascend);
        props.setChosen(props.name);
        props.setAscend(!ascend);
    }
    return (<div className={!props.chosen? "sortingbox": ascend? "sortingbox-ascend": "sortingbox-descend"} onClick={reverse}>{props.name}</div>)
}

const SortingBar = (props) => {
    const allData = props.allData;
    let [chosen, setChosen] = useState(allData[0])
    return (<div className="sortingbar">{allData.map((item)=>{
        return <SortingBox key={"sortingbox-"+item} chosen={chosen===item} name={item} setAscend={props.setAscend} setChosen={(chosen)=>{setChosen(chosen); props.setChosen(chosen)}}></SortingBox>
    })}</div>)
}

const BeforeSearch = () => {
    return (<div className="searchpage-content">
        <article className="searchpage-info">
            <h2>请输入<strong>回车键</strong>以发起搜索</h2>
        </article>
    </div>)
}

const Searching = (props) => {
    const keyword = props.keyword;
    const defaultResult = {
        url: defaultPoster,
        title: '工作细胞',
        id: '2333'
    }
    const [results, setResults] = useState([defaultResult, defaultResult, defaultResult, defaultResult, defaultResult, defaultResult, defaultResult, defaultResult, defaultResult])
    const [res, setRes] = useState([defaultResult, defaultResult, defaultResult, defaultResult, defaultResult, defaultResult, defaultResult, defaultResult, defaultResult]);
    const [tags, alterTags] = useState({
        status: '全部',
        season: '全部',
        time: '全部',
        style: '全部'
    });
    const [entity, setEntity] = useState({ type: "番剧", value: "工作细胞"});
    const [entityTag, setEntityTag] = useState(['番剧', '完结', '一月', '2019年', '漫画改'])
    const [chosen, altChosen] = useState("追番人数")
    const [ascend, altAscend] = useState(false)
    const sortings = (chosen, ascend) => {
        const at = (a, key) => {return key==='年份'? (parseInt(a['年份']) * 100 + parseInt(a['季度/月份'].split('月')[0])): a[key]}
        const translator = {"追番人数": "追番", "最高评分": "评分", "播放数量": "播放量", "开播时间": "年份"}
        return (a, b) => {
            const key = translator[chosen]
            if(a[key] === undefined && b[key] === undefined) return a['id'] - b['id']
            if(a[key] === undefined) return 1
            if(b[key] === undefined) return -1
            if(at(a, key) === at(b, key)) return ascend? a['id'] - b['id']: b['id'] -  a['id']
            return ascend? at(b, key) - at(a, key): at(a, key) - at(b, key)
        }
    }

    const setTags = (nTags) => {
        const condition = {...tags, ...nTags}
        const newRes = res.filter((item)=>{
            let flag = true;
            flag &= (condition.status === '全部' || item['是否完结'] === condition.status);
            flag &= (condition.season === '全部' || item['季度/月份'] === condition.season);
            flag &= (condition.time === '全部' || item['年份'] === condition.time || (item['年份'] < 2014 && '2013及以前' === condition.time));
            flag &= (condition.style === '全部' || (item['tag'] && item['tag'].indexOf(condition.style) >= 0));
            return flag
        }).sort(sortings(chosen, ascend))
        setResults(newRes)
        setEntity({
            type: "番剧",
            value: newRes[0]? newRes[0]['name']: '暂无实体'
        })
        let newTags = newRes[0]? newRes[0]['tag']: []
        if(newTags && newTags.length > 0 && newRes[0].tagged !== true){
            newTags.push(newRes[0]['季度/月份'])
            newTags.push(newRes[0]['年份']+'年')
            newTags.push(newRes[0]['是否完结'])
            newRes[0].tagged = true
        }
        setEntityTag(newTags || [])
        alterTags(condition)
    }

    const setChosen = (newChosen) => {
        if(newChosen !== chosen){
            altChosen(newChosen)
            const newRes = results.sort(sortings(newChosen, ascend))
            setResults(newRes)
            setEntity({
                type: "番剧",
                value: newRes[0]? newRes[0]['name']: '暂无实体'
            })
            let newTags = newRes[0]? newRes[0]['tag']: []
            if(newTags && newTags.length > 0 && newRes[0].tagged !== true){
                newTags.push(newRes[0]['季度/月份'])
                newTags.push(newRes[0]['年份']+'年')
                newTags.push(newRes[0]['是否完结'])
                newRes[0].tagged = true
            }
            setEntityTag(newTags || [])
        }
    }

    const setAscend = (newAscend) => {
        if(newAscend !== ascend){
            altAscend(newAscend)
            const newRes = results.sort(sortings(chosen, newAscend))
            setResults(newRes)
            setEntity({
                type: "番剧",
                value: newRes[0]['name']
            })     
            let newTags = newRes[0]? newRes[0]['tag']: []
            if(newTags && newTags.length > 0 && newRes[0].tagged !== true){
                newTags.push(newRes[0]['季度/月份'])
                newTags.push(newRes[0]['年份']+'年')
                newTags.push(newRes[0]['是否完结'])
                newRes[0].tagged = true
            }
            setEntityTag(newTags || [])
        }
    }

    const ResultList = () => {
        let i = 1;
        return (<div className="result-list">{results.map((item)=>{
            i += 1;
            return <div key={"poster"+i} className="result-item" onClick={()=>{history.push(`/anime/${item.id}`)}}>
                <div className="result-poster"><img className="result-poster-img" src={item.cover} alt={item.name+"海报"}/></div>
                <div className="result-title">{item.name}</div>
            </div>
        })}</div>)
    }

    const allSortings = ["追番人数", "最高评分", "播放数量", "开播时间"];
    const allTags = [{
        type: '状态',
        name: 'status',
        values: ['全部', '已完结', '未完结']
    }, {
        type: '季度',
        name: 'season',
        values: ['全部', '1月', '4月', '7月', '10月']
    }, {
        type: '时间',
        name: 'time',
        values: ['全部', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013及以前']
    }, {
        type: '风格',
        name: 'style',
        values: ['全部', '原创', '游戏改', '小说改', '漫画改', '社团', '推理', '偶像', '智斗', '音乐', '声控', '魔法', '穿越', '运动', '泡面', '机战', 
        '冒险', '恋爱', '治愈', '搞笑', '校园', '战斗', '热血', '日常']
    }, ];

    useEffect(()=>{
        axios.post('http://localhost:5000/query', { "keyword": keyword }, { headers: { "Content-Type": "application/json" }})
        .then( res => { 
            let data = res.data
            data.forEach(item => {
                item['cover'] = constant.urlProcess(item['cover'])    
                console.log(item['cover'])   
            });
            if(keyword!==''){
                if(data.length > 0){
                    setResults(data.sort(sortings(chosen, ascend)))
                    setRes(data)
                    setEntity({
                        type: "番剧",
                        value: data[0]['name']
                    })
                    let newTags = data[0]['tag']
                    if(newTags){
                        newTags.push(data[0]['季度/月份'])
                        newTags.push(data[0]['年份']+'年')
                        newTags.push(data[0]['是否完结'])
                        setEntityTag(newTags)
                        data[0].tagged = true
                    }else{
                        setEntityTag([])
                    }
                }else{
                    history.push(`/sorry/${keyword}`)
                }
            }
            console.log(data)
        })
        .catch( res => { console.log(res)})
        }, []);

    return (
        <div className="searchpage-content">
            <div className="searchpage-left">
                <div className="searchpage-entitybar">
                    <div className="searchpage-entity">{entity.value}</div>
                    <div className="searchpage-entitytype">{entity.type}</div>
                </div>
                <div className="searchpage-tagbar">
                    <div className="searchpage-tagbar-title">标签</div>
                    <div className="searchpage-tagbar-container">
                    {entityTag.map((item)=>{
                        return <div key={"tagbar-"+item} className="searchpage-tagbar-tag">{item}</div>
                    })}</div>
                </div>
                <div className="searchpage-sortbar"><SortingBar allData={allSortings} setAscend={setAscend} setChosen={setChosen}/></div>
                <div className="searchpage-resultbar"><ResultList/></div>
            </div>
            <div className="searchpage-right">
                <div className="searchpage-right-title">筛选</div>
                <div className="searchpage-right-tags">
                {allTags.map((item)=><Tag key={"right-"+item.name} taginfo={item} setTags={setTags}/>)}
                </div>
            </div>
        </div>
    )
}

const AppSearch = () => {    
    const [keyword, setKeyword] = useState(useParams().keyword || "");
    return (<div className = "searchpage pinkbackground">
        <SearchHeader keyword={keyword}/>
        {keyword === "" && <BeforeSearch/>}
        {keyword !== "" && <Searching keyword={keyword} setKeyword={keyword}/>}
        <AppFooter styleClass="normal-footer" />
    </div>)

}

export default AppSearch;