import React from "react";
import SearchHeader from "../component/SearchHeader";
import AppFooter from "../component/AppFooter";

const Anime = () => {
    return (<div className = "pinkbackground">
        <SearchHeader/>
        <div className = "animepage">
            <div className = "animepage-left">
                <div className="animepage-info"/>
                <div className="animepage-recommendation"/>
            </div>
            <div className = "animepage-right">
                <div className="animepage-seiyuu"/>
                <div className="animepage-staff"/>
            </div>
        </div>
        <AppFooter styleClass="normal-footer" />
    </div>)
}

export default Anime;