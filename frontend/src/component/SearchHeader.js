import React, { useState } from "react";
import { Input } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import history from "../util/history";
import constant from "../util/constant";

const SearchHeader = (props) => {
    const placeholder = "番剧名称/制作公司/原作者/导演";
    const rawKeyword = props.keyword;
    let [keyword, setKeyword] = useState("");
    const onSearch = () => {
        console.log(keyword)
        history.push(`/search/${keyword}`);
    };
    const onKeyDownChange = (e) => {
        if(e.keyCode === constant.enterKeyCode || e.keyCode === constant.minorEnterKeyCode)
            onSearch()
    }
    const enterButton = () => {
        return (<SearchOutlined onClick={onSearch} style={{color: "#f9749a"}}/>)
    }
    
    return (
        <div className="appheader-container">
            <div className="appheader-logo" onClick={()=>{history.push("/")}}/>
            <div className="appheader-search">
                <Input placeholder={placeholder} size="large" defaultValue={rawKeyword?rawKeyword:""} 
                onChange={(e)=>{setKeyword(e.target.value)}} onKeyDown={onKeyDownChange} suffix={enterButton()}/>
            </div>
            <div className="appheader-right" onClick={()=>{history.push("/")}}/>
        </div>
    )
}
export default SearchHeader;