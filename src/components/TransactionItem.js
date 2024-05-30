import React from "react";

const TransactionItem = ({ transaction }) => {
  console.log(transaction);
  const TinDate = transaction?.createdAt.indexOf("T");
  return (
    <tr>
      <td
        style={
          transaction.type === "withdraw" || transaction.type === "transfer"
            ? { color: "red" }
            : { color: "green" }
        }
      >
        {transaction.type === "withdraw" || transaction.type === "transfer"
          ? `- ${transaction.amount}`
          : `+ ${transaction.amount}`}
      </td>
      <td>{transaction.createdAt.substring(0, TinDate)}</td>
      <td>{transaction.type}</td>
    </tr>
  );
};

export default TransactionItem;
