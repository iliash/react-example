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
        this.headerSort = this.headerSort.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.state = {
            fullListSongs: getSongs(),
            songs: getSongs(),
            fields: this.getFilterList(),
            selectList: this.getSelectList(this.getFilterList(), getSongs()),
            activePage: 1
        };
    }
    headerSort = function (data) {
        this.setState({'songs': data.songs});
        this.setState(data.sortedField);
    };
    getFilterList() {
        return ['name', 'style', 'year']
    }
    checkUniqueItem(param, list) {
        list.forEach(function (item, i) {
            if (param == item) {
                return false;
            }

            return true;
        });

        return true;
    }
    getUniqueProps(name, props) {
        let uniqueArray = [];
        let list = props.map(function (item) {
            return item[name];
        });

        list.filter(function (param) {
            let itemExist = this.checkUniqueItem(param, uniqueArray);

            if (itemExist) {
                uniqueArray.push(param);
            }
        }, this)

        return uniqueArray;
    }
    getSelectList(fieldList, songs){
        let list = [];

        fieldList.forEach(function (item) {
            list.push({key: item, value: this.getUniqueProps(item, songs)});
            // return this.getUniqueProps(item, songs);
        }, this);

        return list;
    }
    selectItem(select, e){
        let resultItems = this.state.fullListSongs.filter(function(value){
            return value[select] == e.target.value
        });

        this.setState({'songs': resultItems});
        this.props.onChange(resultItems);
    }
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
                    <SearchBlock data={this.state.songs} selectFields = {this.state.fields} selectList = {this.state.selectList} onChange={this.selectItem} ></SearchBlock>
                </div>
                <div className="">
                    <Grid data={this.state.songs} columns={columns} headerSort={this.headerSort}></Grid>
                </div>
            </div>
        );
    }
}

export default App;
