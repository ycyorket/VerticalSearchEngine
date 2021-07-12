import React, {useState} from "react";
import { Layout, Input } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import AppFooter from "../component/AppFooter";
import history from "../util/history";
const {Search} = Input;

const Homepage = () => {
    let [keyword, setKeyword] = useState("");
    const onSearch = () => {
        history.push(`/search?keyword="${keyword}"`);
    };

    const placeholder = "番剧名称/制作公司/原作者/导演";
    const enterButton = () => {
        return (<SearchOutlined style={{color: "#f9749a"}}/>)
    }
    
    return (<div className = "homepage">
        <div className="homepage-top"/>
        <div className="homepage-mid">
            <div className="homepage-logo"/>
            <div className="homepage-search">
                <Search placeholder={placeholder} onSearch={onSearch} onChange={(e)=>{setKeyword(e.target.value)}} suffix={enterButton} />
            </div>
        </div>
        <div className="homepage-bot"/>
        <AppFooter styleClass="light-footer" />
    </div>)
}

export default Homepage;