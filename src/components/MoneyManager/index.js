import React from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// const card = [
//   {
//     id: 'BALANCE',
//     name: 'balance',
//     displayText: 'Balance',
//     imgUrl:
//       'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
//   },
//   {
//     id: 'INCOME',
//     name: 'income',
//     displayText: 'Income',
//     imgUrl:
//       'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
//   },
//   {
//     id: 'EXPENSES',
//     name: 'expenses',
//     displayText: 'Expenses',
//     imgUrl:
//       'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
//   },
// ]

class MoneyManager extends React.Component {
  state = {
    addTitle: '',
    addAmount: '',
    addType: 'Income',
    transactions: localStorage.getItem('transactions')
      ? JSON.parse(localStorage.getItem('transactions'))
      : [],
  }

  titleInput = event => this.setState({addTitle: event.target.value})

  amountInput = event => this.setState({addAmount: event.target.value})

  selectInput = event => this.setState({addType: event.target.value})

  submit = event => {
    event.preventDefault()

    const {addTitle, addAmount, addType, transactions} = this.state
    if (addTitle !== '' && addAmount !== '') {
      this.setState(() => {
        const transactedItem = {
          id: uuidv4(),
          title: addTitle,
          amount: addAmount,
          type: addType,
        }
        console.log()
        const updatedHistoryItem = [...transactions, transactedItem]
        return {transactions: updatedHistoryItem}
      })
    }

    this.setState({addTitle: '', addAmount: '', addType: 'Income'})
  }

  deleteHistoryItem = id => {
    this.setState(() => {
      const {transactions} = this.state
      const filteredItems = transactions.filter(obj => obj.id !== id)
      return {transactions: filteredItems}
    })
  }

  calculateBalance = () => this.totalIncome() - this.totalExpenses()

  totalIncome = () => {
    const {transactions} = this.state
    const result = transactions
      .filter(obj => obj.type.toLowerCase() === 'income')
      .reduce((total, obj) => total + Number(obj.amount), 0)
    
    return result
  }

  totalExpenses = () => {
    const {transactions} = this.state
    const result = transactions
      .filter(obj => obj.type.toLowerCase() === 'expenses')
      .reduce((total, obj) => total + Number(obj.amount), 0)
    return result
  }

  render() {
    const {transactions} = this.state
    const {addTitle, addAmount} = transactions
    localStorage.setItem('transactions', JSON.stringify(transactions))

    const calculateBalance = this.calculateBalance()
    const totalIncome = this.totalIncome()
    const totalExpenses = this.totalExpenses()

    return (
      <div className="container">
        <div className="user-info-container border">
          <h1 className="user-name">Hi, Richard</h1>
          <p className="description">
            Welcome back to your <span> Money Manager </span>
          </p>
        </div>

        <MoneyDetails
          calculateBalance={calculateBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        <div className="activity-container">
          <div className="transaction-container border">
            <h1 className="transaction-heading">Add Transaction</h1>
            <form className="form">
              <div className="title-input-container">
                <label htmlFor="titleInput">TITLE</label>
                <input
                  id="titleInput"
                  type="text"
                  className="title-input"
                  placeholder="TITLE"
                  value={addTitle}
                  onChange={this.titleInput}
                />
              </div>
              <div className="amount-input-container">
                <label htmlFor="amountInput">AMOUNT</label>
                <input
                  id="amountInput"
                  type="text"
                  className="amount-input"
                  placeholder="TITLE"
                  value={addAmount}
                  onChange={this.amountInput}
                />
              </div>
              <div className="type-input-container">
                <label htmlFor="typeInput">TYPE</label>
                <select
                  id="typeInput"
                  className="select-input"
                  onChange={this.selectInput}
                >
                  <option value={transactionTypeOptions[0].optionId}>
                    Income
                  </option>
                  <option value={transactionTypeOptions[1].optionId}>
                    Expenses
                  </option>
                </select>
              </div>
              <div>
                <button
                  className="add-transaction-btn"
                  type="button"
                  onClick={this.submit}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="history-container border">
            <h1 className="history-heading">History</h1>
            {/* <ul className="history-items">
              <li className="table-heading">
                <div className="table-heading-item table-heading-item-1">
                  <p className="table-heading-name">Title</p>
                </div>
                <div className="table-heading-item table-heading-item-2">
                  <p className="table-heading-name">Amount</p>
                </div>
                <div className="table-heading-item table-heading-item-3">
                  <p className="table-heading-name">Type</p>
                </div>
              </li>
              {}
            </ul> */}

            <table className="history-items">
              <tr className="">
                <th className="th-1 table-heading">
                  <p>Title</p>
                </th>
                <th className="th-2 table-heading">
                  <p>Amount</p>
                </th>
                <th className="th-3 table-heading">
                  <p>Type</p>
                </th>
              </tr>
              {transactions.map(obj => (
                <TransactionItem
                  transactionDetails={obj}
                  key={obj.id}
                  deleteHistoryItem={this.deleteHistoryItem}
                />
              ))}
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
