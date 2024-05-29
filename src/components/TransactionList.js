import React from "react";
import TransactionItem from "./TransactionItem"; // Import the Transaction component

const TransactionList = ({ transactions }) => {
  const transactionList = transactions.map((transaction) => (
    <TransactionItem transaction={transaction} key={transaction.id} />
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Date</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>{transactionList}</tbody>
    </table>
  );
};

export default TransactionList;
