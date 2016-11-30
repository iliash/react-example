import React, {Component} from 'react';
import './App.css';
import {getSongs} from './services/Songs/Songs';
import Grid from './../src/components/grid/Grid';
import SearchBlock from './../src/components/searchBlock/SearchBlock';
import Pagination from "react-js-pagination";

let columns = {'name': 'Исполнитель', 'song': 'Произведение', 'style': 'Жанр', 'year': 'Год'};

class App extends Component {
    constructor(props) {
        super(props);
        this.headerSort = this.headerSort.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.state = {
            searchSongs: this.getPageItems(1, getSongs()),
            songs: getSongs(),
            fields: this.getFilterList(),
            selectList: this.getSelectList(this.getFilterList(), getSongs()),
            search: [],
            activePage: 1,
            itemsPerPage: 3,
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
        let result = true;
        list.forEach(function (item) {
            if (param === item) {
                result = false;
            }
        });

        return result;
    }

    getUniqueProps(name, props) {
        let uniqueArray = [];
        uniqueArray.push('All');
        let list = props.map(function (item) {
            return item[name];
        });

        list.filter(function (param) {
            let itemExist = this.checkUniqueItem(param, uniqueArray);

            if (itemExist) {
                uniqueArray.push(param);
            }
        }, this);

        return uniqueArray;
    }

    getSelectList(fieldList, songs) {
        let list = [];

        fieldList.forEach(function (item) {
            list.push({key: item, value: this.getUniqueProps(item, songs)});
        }, this);

        return list;
    }

    selectItem(select, e) {
        let state = this.state.search;
        state[select] = e.target.value;
        let songList = this.state.songs;

        let songlist = songList.filter(function (value) {
            let count = 0;
            let equalCount = 0;
            for (let item in this.state.search) {
                if ('All' === this.state.search[item] || value[select] === this.state.search[item]) {
                    equalCount++;
                }

                count++;
            }

            return (equalCount == count && count !== 0);
        }, this);

        this.setState({'searchSongs': songlist});
    }

    getPageItems(pageNumber, songs) {
        console.log(songs);
        let limitedSongs = [];
        if (pageNumber === 1) {
            for (let item in songs) {
                if (item < 3) {
                    limitedSongs.push(songs[item]);
                }
            }
        } else {
            for (let item in songs) {
                if ((pageNumber - 1) * 3 < item && (pageNumber + 1) * 3 > item) {
                    limitedSongs.push(songs[item]);
                }
            }
        }


        return limitedSongs;
    }

    handlePageChange(pageNumber) {
        let limitedSongs = this.getPageItems(pageNumber, this.state.songs)
        this.setState({searchSongs: limitedSongs});
        this.setState({activePage: pageNumber});
    }

    render() {
        return (
            <div className="App">
                {console.log(this.state.searchSongs)}
                <div className="songs-list-wrapper clearfix">
                    <div className="song-list">
                        <Grid data={this.state.searchSongs} columns={columns} headerSort={this.headerSort}></Grid>
                    </div>
                    <div className="filter-box">
                        <SearchBlock data={this.state.searchSongs} columns={columns} selectFields={this.state.fields}
                                     selectList={this.state.selectList} onChange={this.selectItem}></SearchBlock>
                    </div>
                </div>
                <div className="pagination-box">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsPerPage}
                        totalItemsCount={this.state.songs.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default App;
