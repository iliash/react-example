import React from 'react';

class Select extends React.Component {

    selectItem(data) {
        // this.props.clickHandler(field);
    }

    render() {
        return (
            <select>
                { this.props.data.forEach(function (item, i) {
                   return <option onClick={this.selectItem.bind(this, {name: this.props.name, value: item})}>{item}</option>
                }, this)
                }
            </select>
        )
    }
}

export default Select;