import React from "react";
import logo from '../assets/logo.png';

export default class AppHeader extends React.Component{
    render(){
        return (
            <div style={{display: "flex", flexDirection: "row", height: "200px"}}>
                <div style={{flexGrow: 2}}></div>
                <div style={{
                    flexGrow: 1,
                    backgroundImage: "url(" + logo + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center"
                }}></div>
                <div style={{flexGrow: 2}}></div>
            </div>
        )
    }
}
