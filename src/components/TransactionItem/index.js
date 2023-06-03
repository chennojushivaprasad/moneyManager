// Write your code here

import React from 'react'
import './index.css'

class TransactionItem extends React.Component {
  delete = () => {
    const {transactionDetails, deleteHistoryItem} = this.props
    const {id} = transactionDetails
    deleteHistoryItem(id)
  }

  render() {
    const {transactionDetails} = this.props
    const {title, amount, type} = transactionDetails
    const currency = 'Rs '
    return (
      <>
        <tr className="">
          <td className="td-1 table-data">{title}</td>
          <td className="td-2 table-data">
            <p>{`${currency} ${amount}`}</p>
          </td>
          <td className="td-3 table-data">
            {type.toLowerCase()}
            <button
              data-testid="delete"
              className="delete-btn"
              type="button"
              onClick={this.delete}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
                alt="delete"
              />
            </button>
          </td>
        </tr>
      </>
    )
  }
}
export default TransactionItem
