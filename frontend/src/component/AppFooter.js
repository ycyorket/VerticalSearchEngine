import React from "react";
import {Layout} from 'antd';
const {Footer} = Layout; 

const AppFooter = (props) => {
    const footerText = "BANQUERY©浙江大学软件工程项目实训G88";
    return (
        <Footer className={props.styleClass+ " appfooter"}>
            <div className="footer-copyright">{footerText}</div>
            <div className="footer-links">
                <a className="footer-agreement" href="/agreement">服务条款</a>
                |
                <a className="footer-help" href="/help">使用帮助</a>
            </div>
        </Footer>
    )
}

export default AppFooter;
