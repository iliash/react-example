import React from 'react';
import SelectSearch from './../select/Select'

class SearchBlock extends React.Component {
    constructor(props) {
        super(props);
        this.selectItem = this.selectItem.bind(this);
        // this.setState({'songs': props.data});
    }
    selectItem(select, e){
        console.log(select);
        this.props.onChange(select, e)
    }
    render() {
        return (
            <form>
                  { this.props.selectList.map(function (select) {
                    return <SelectSearch name={ select.key } onChange={this.selectItem.bind(this, select.key)}
                                      data={ select.value }></SelectSearch>
                }, this) }
            </form>
        )
    }
}

export default SearchBlock;
