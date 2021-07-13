import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import './App.css';
import 'antd/dist/antd.css';

import AppSearch from "./page/AppSearch";
import UserAgreement from './page/UserAgreement';
import Help from './page/Help';
import Homepage from './page/Homepage';
import Disconnected from './page/Disconnected';
import Anime from './page/Anime';
import NotFound from './page/404';
import SorrySearch from './page/SorrySearch';

const { Content} = Layout;

export default class App extends React.Component {
    render() {
        return (
          <Router>
            <Layout className="layout" style={{"minHeight": "100vh"}}>
              <Content>
                  <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/sorry/:keyword" component={SorrySearch}/>
                    <Route path="/search/:keyword" component={AppSearch}/>
                    <Route path="/sorry" component={SorrySearch}/>
                    <Route path="/search" component={AppSearch}/>
                    <Route path="/disconnected" component={Disconnected}/>
                    <Route path="/agreement" component={UserAgreement}/>
                    <Route path="/help" component={Help}/>
                    <Route path="/anime/:id" component={Anime}/>
                    <Route path="*" component={NotFound}/>
                  </Switch>
              </Content>
            </Layout>
          </Router>
        );
    }
}