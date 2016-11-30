import React from 'react';

class Select extends React.Component {
    selectItem() {
    }
    render() {
        return (
            <div>
                <div className="select-title">{this.props.columns[this.props.name]}</div>
                <select className="form-control" onChange={this.props.onChange}>
                    { this.props.data.map(function (item, i) {
                        return <option value={item} selected={item === 'All' ? 'selected' : ''}  >{item}</option>
                    }, this)
                    }
                </select>
            </div>
        )
    }
}

export default Select;