import React, {useState} from "react";
import SearchHeader from "../component/SearchHeader";
import AppFooter from "../component/AppFooter";

const Tag = (props) => {
    let [chosen, setChosen] = useState('全部');
    const type = props.taginfo.type;
    const name = props.taginfo.name;
    const values = props.taginfo.values;
    const setTags = props.setTags;
    return (<div className="tag-container">
        <div className="tag-title">{type}</div>
        {values.map(
            (item)=>
            <div key={name+'-'+item} className={item===chosen?"tag-item-chosen": "tag-item"} onClick={()=>{
                setChosen(item);
                const newTag = {};
                newTag[name] = item;
                setTags(newTag);
            }}>{item}</div>
            )}
    </div>)
}

const SortingBox = (props) => {
    let [ascend, setAscend] = useState(false)
    const reverse = () => {
        setAscend(!ascend);
        props.setChosen(props.name);
    }
    return (<div className={!props.chosen? "sortingbox": ascend? "sortingbox-ascend": "sortingbox-descend"} onClick={reverse}>{props.name}</div>)
}

const SortingBar = (props) => {
    const allData = props.allData;
    let [chosen, setChosen] = useState(allData[0])
    return (<div className="sortingbar">{allData.map((item)=>{
        return <SortingBox key={"sortingbox-"+item} chosen={chosen===item} name={item} setChosen={setChosen}></SortingBox>
    })}</div>)
}

const AppSearch = (props) => {
    const allTags = [{
        type: '类型',
        name: 'type',
        values: ['全部', '番剧', '电影', '其他']
    }, {
        type: '地区',
        name: 'region',
        values: ['全部', '日本', '中国', '美国', '其他']
    }, {
        type: '状态',
        name: 'status',
        values: ['全部', '完结', '连载']
    }, {
        type: '季度',
        name: 'season',
        values: ['全部', '1月', '4月', '7月', '10月']
    }, {
        type: '时间',
        name: 'time',
        values: ['全部', '2021', '2020', '2019', '2018及以前']
    }, {
        type: '风格',
        name: 'style',
        values: ['全部', '原创', '小说改', '漫画改', '游戏改']
    }, ];

    const allSortings = ["追番人数", "更新时间", "最高评分", "播放数量", "开播时间"]

    let [tags, alterTags] = useState({
        type: '全部',
        region: '全部',
        status: '全部',
        season: '全部',
        time: '全部',
        style: '全部'
    });

    const entityTag = {
        type: '番剧',
        region: '日本',
        status: '已完结',
        season: '4月',
        time: '2000年',
        style: '漫画改'
    }

    const entity = {
        type: "番剧",
        value: "工作细胞"
    }

    const keyword = props.match.params.keyword;
    const setTags = (newTags) => {
        alterTags({...tags, ...newTags})
    }

    return (<div className = "searchpage pinkbackground">
        <SearchHeader keyword={keyword}/>
        <div className="searchpage-content">
            <div className="searchpage-left">
                <div className="searchpage-entitybar">
                    <div className="searchpage-entity">{entity.value}</div>
                    <div className="searchpage-entitytype">{entity.type}</div>
                </div>
                
                <div className="searchpage-tagbar">
                    <div className="searchpage-tagbar-title">标签</div>
                    <div className="searchpage-tagbar-container">
                        {Object.keys(entityTag).map((key)=>{
                            return <div key={"tagbar"+key} className="searchpage-tagbar-tag">{entityTag[key]}</div>
                        }
                        )}
                    </div>
                </div>
                <div className="searchpage-sortbar">
                    <SortingBar allData={allSortings}></SortingBar>
                </div>
                <div className="searchpage-result"></div>
            </div>
            <div className="searchpage-right">
                <div className="searchpage-right-title">筛选</div>
                <div className="searchpage-right-tags">
                    {allTags.map(
                        (item)=>
                        <Tag key={"right-"+item.name} taginfo={item} setTags={setTags}/>
                    )}
                </div>
            </div>
        </div>
        <AppFooter styleClass="normal-footer" />
    </div>)
}

export default AppSearch;