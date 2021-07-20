import React, {useState} from "react";
import {Input } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import AppFooter from "../component/AppFooter";
import history from "../util/history";
import constant from "../util/constant";
import axios from "axios";
import debounce from "../util/performance";

const {Search} = Input;

const Homepage = () => {
    let [keyword, setKeyword] = useState("");
    let [result, setResult] = useState(['a', 'b', 'c', 'd', 'e', 'f']);
    const onSearch = (s) => {
        history.push(`/search/${s||keyword}`);
    };

    const placeholder = "番剧名称/制作公司/原作者/导演";
    const enterButton = () => {
        return (<SearchOutlined style={{color: "#f9749a"}}/>)
    }

    const onKeyDownChange = (e) => {
        if(e.keyCode === constant.enterKeyCode || e.keyCode === constant.minorEnterKeyCode)
            onSearch()
    }
    
    const onChange = (e) => {
        setKeyword(e.target.value)
        axios.post('http://localhost:5000/associatedWordSearch', { "keyword": e.target.value }, { headers: { "Content-Type": "application/json" }})
        .then( res => { 
            let data = res.data
            console.log(data)
            setResult(data)
        })
        .catch( res => { console.log(res)})
    }

    return (<div className = "homepage">
        <div className="homepage-top"/>
        <div className="homepage-mid">
            <div className="homepage-logo"/>
            <div className="homepage-search-container">
                <Search className="homepage-search" size="large" placeholder={placeholder} onSearch={onSearch} onKeyDown={onKeyDownChange} onChange={onChange} suffix={enterButton()} />
                {keyword!=="" && result.length > 0 && <div className="homepage-search-result"><div className="homepage-search-list">{result.map((item)=>{
                    return <div className="homepage-search-item" key={`aw${item}`} onClick={()=>{onSearch(item)}}>{item}</div>})}</div></div>}
            </div>
        </div>
        <div className="homepage-bot"/>
        <AppFooter styleClass="light-footer" />
    </div>)
}

export default Homepage;