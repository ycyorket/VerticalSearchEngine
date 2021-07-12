import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import AppSearch from "./page/AppSearch";
import UserAgreement from './page/UserAgreement';
import Help from './page/Help';
import Homepage from './page/Homepage';

const { Content} = Layout;

export default class App extends React.Component {
    render() {
        return (
          <Router>
            <Layout className="layout" style={{"minHeight": "100vh"}}>
              <Content>
                  <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/search/:keyword" component={AppSearch}/>
                    <Route path="/agreement" component={UserAgreement}/>
                    <Route path="/help" component={Help}/>
                  </Switch>
              </Content>
            </Layout>
          </Router>
        );
    }
}