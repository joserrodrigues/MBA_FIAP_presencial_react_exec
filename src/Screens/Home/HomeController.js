import React, { Component } from 'react';
import HomeView from './HomeView';

export default class HomeController extends Component {

    constructor() {
        super();
        this.state = { 
            count: 0
        };
    }

    onClicked = () => {
        this.setState({
            count: this.state.count + 1
        })

    }

    render() {
        return <HomeView count={this.state.count} onClicked={this.onClicked}/>;
    }
}
