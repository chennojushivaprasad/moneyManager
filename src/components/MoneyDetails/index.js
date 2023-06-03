import React from 'react'
import './index.css'

class MoneyDetails extends React.Component {
  render() {
    const {calculateBalance, totalIncome, totalExpenses} = this.props
    return (
      <ul className="stats-container">
        <li className="balance-stats-container border">
          <div className="stats-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
              alt="Balance"
              className="balance-img"
            />
          </div>
          <div className="stats">
            <p className="stats-heading">Your Balance</p>
            <p data-testid="balanceAmount" className="balance-info">
              Rs {calculateBalance}
            </p>
          </div>
        </li>
        <li className="income-stats-container border">
          <div className="stats-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
              alt="income"
              className="income-img"
            />
          </div>
          <div className="stats">
            <p className="stats-heading">Your Income</p>
            <p data-testid="incomeAmount" className="income-info">
              Rs {totalIncome}
            </p>
          </div>
        </li>
        <li className="expenses-stats-container border">
          <div className="stats-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
              className="expenses-img"
            />
          </div>
          <div className="stats">
            <p className="stats-heading">Your Expenses</p>
            <p data-testid="expensesAmount" className="expenses-info">
              Rs {totalExpenses}
            </p>
          </div>
        </li>
      </ul>
    )
  }
}

export default MoneyDetails
