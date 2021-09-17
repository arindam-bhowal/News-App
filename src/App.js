import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {

  state = {
    progress: 0
  }

  progressBar = (progress) => {
    this.setState({
      progress: progress
    })
  }

  render() {
    return (
      <>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar />
          <Switch>

            <Route exact path="/"> <News progress={this.progressBar} key='general' pageSize={6} category='general' /> </Route>
            <Route exact path="/business"> <News progress={this.progressBar} key='business' pageSize={6} category='business' /> </Route>
            <Route exact path="/entertainment"> <News progress={this.progressBar} key='entertainment' pageSize={6} category='entertainment' /> </Route>
            <Route exact path="/health"> <News progress={this.progressBar} key='health' pageSize={6} category='health' /> </Route>
            <Route exact path="/science"> <News progress={this.progressBar} key='science' pageSize={6} category='science' /> </Route>
            <Route exact path="/sports"> <News progress={this.progressBar} key='sports' pageSize={6} category='sports' /> </Route>
            <Route exact path="/technology"> <News progress={this.progressBar} key='technology' pageSize={6} category='technology' /> </Route>

          </Switch>
        </Router>
      </>
    )
  }
}