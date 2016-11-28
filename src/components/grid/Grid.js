import React from 'react';
import Item from './../item/Item'

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.hSort = this.hSort.bind(this);
    }

    hSort(field) {
        let sortField = [];
        let status = this.state ? !this.state[field] : false;
        let sortedSongs = this.props.data.sort((a, b) => {
            let result = 0;

            if (Number.isInteger(a[field]) && Number.isInteger(b[field])) {
                result = a[field] - b[field];
            } else {
                let res = a[field].localeCompare(b[field]);

                if (res > 0) {
                    result = 1;
                } else {
                    result = -1;
                }
            }

            return status ? result : result * -1;
        });
        this.setState({'songs': sortedSongs});
        sortField[field] = status;
        this.setState(sortField);
    };

    render() {
        return (
            <table className="grid table table-bordered">
                <thead>
                <Item columns={Object.keys(this.props.columns)}
                      data={this.props.columns}
                      className="table-head"
                      clickHandler={this.hSort}
                >
                </Item>
                </thead>
                <tbody>
                {this.props.data.map(function (item) {
                    return <Item columns={Object.keys(this.props.columns)} data={item}></Item>
                }, this)}
                </tbody>
            </table>
        )
    }
}

export default Grid;
