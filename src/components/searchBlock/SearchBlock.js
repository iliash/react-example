import React from 'react';
import SelectSearch from './../select/Select'

class SearchBlock extends React.Component {
    constructor(props) {
        super(props);
        this.selectItem = this.selectItem.bind(this);
    }

    selectItem(select, e) {
        this.props.onChange(select, e)
    }

    render() {
        return (
            <form>
                { this.props.selectList.map(function (select) {
                    return <SelectSearch name={ select.key } columns={this.props.columns}
                                         onChange={this.selectItem.bind(this, select.key)}
                                         data={ select.value }></SelectSearch>
                }, this) }
            </form>
        )
    }
}

export default SearchBlock;
