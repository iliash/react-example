import React from 'react';

class Item extends React.Component {
    itemSort(field) {
        this.props.clickHandler(field);
    }
    render() {
        return (
            <tr className="row">
                {this.props.columns.map(function (column) {
                    return <td
                        className={ this.props.className ? this.props.className : 'item'}
                        onClick={ this.props.clickHandler ? this.itemSort.bind(this, column) : '' }
                    >{this.props.data[column]}
                    </td>
                }, this)
                }
            </tr>
        )
    }
}

export default Item;
