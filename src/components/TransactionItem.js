import React from "react";
import { useTranslation } from "react-i18next";

const TransactionItem = ({ transaction }) => {
  const { t } = useTranslation();
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
      <td>{t(transaction.type)}</td>
    </tr>
  );
};

export default TransactionItem;
