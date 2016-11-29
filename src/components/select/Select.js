import React from 'react';

class Select extends React.Component {
    selectItem() {
    }

    render() {
        return (
            <select className="form-control" onChange={this.props.onChange} >
                { this.props.data.map(function (item, i) {
                   return <option value={item}>{item}</option>
                }, this)
                }
            </select>
        )
    }
}

export default Select;