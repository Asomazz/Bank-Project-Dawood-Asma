import React from "react";
import { getAllTransactions } from "../api/auth";
import TransactionItem from "./TransactionItem";
import { useQuery } from "@tanstack/react-query";

const TransactionList = ({ transactions }) => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });

  const transactionList = transactions?.map((transaction) => (
    <TransactionItem transaction={transaction} key={transaction.id} />
  ));

  if (isLoading) return <h1>Wait!!</h1>;

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
