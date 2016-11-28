import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {getSongs} from './services/Songs/Songs';
import Grid from './../src/components/grid/Grid';
import SearchBlock from './../src/components/searchBlock/SearchBlock';

let columns = {'name': 'Исполнитель', 'song': 'Произведение', 'style': 'Жанр', 'year': 'Год'};

class App extends Component {
    constructor(props) {
        super(props);
        // this.headerSort = this.headerSort.bind(this);
        this.state = {songs: getSongs()};
        // console.log(this.state.songs);
    }
    headerSort = function (field) {
        console.log(1);
        // console.log(this.state);
        // let sortedSongs = this.state.songs.sort((a, b) => {
        //     return a[field] - b[field];
        // });
        // this.setState({'songs': sortedSongs});
    };
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div>
                    <SearchBlock data={this.state.songs} ></SearchBlock>
                </div>
                <div className="">
                    <Grid data={this.state.songs} columns={columns} headerSort={this.headerSort}></Grid>
                </div>
            </div>
        );
    }
}

export default App;
