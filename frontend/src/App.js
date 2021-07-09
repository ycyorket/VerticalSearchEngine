import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import AppHeader from "./component/AppHeader";
import './App.css';
import 'antd/dist/antd.css';
import SearchPage from "./page/SearchPage";

const { Content, Footer } = Layout;

export default class App extends React.Component {
    render() {
        return (
          <Router>
            <Layout className="layout" style={{"minHeight": "100vh"}}>
              <AppHeader history={this.history}/>
              <Content style={{ padding: '20px 50px' }}>
                  <Switch>
                    <Route path="/">
                      <SearchPage />
                    </Route>
                  </Switch>
              </Content>
              <Footer style={{ textAlign: 'center' }}>LiveNive ©2021 Created by ZJU-ULSS-CD</Footer>
            </Layout>
          </Router>
        );
    }
}