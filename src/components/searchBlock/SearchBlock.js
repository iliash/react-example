import React from 'react';
import SelectSearch from './../select/Select'

class SearchBlock extends React.Component {
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

    render() {
        return (
            <form>
                { this.getFilterList().map(function (select) {
                    return
                        <SelectSearch name={ select }
                                      data={ this.getUniqueProps(select, this.props.data) }></SelectSearch>
                }, this) }
            </form>
        )
    }
}

export default SearchBlock;
