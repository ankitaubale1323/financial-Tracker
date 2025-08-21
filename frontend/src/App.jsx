import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";

function App() {
  const [transactions, setTransactions] = useState([]);

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:5000/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add new transaction
  const addTransaction = async (transaction) => {
    try {
      const res = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });
      const data = await res.json();
      setTransactions([...transactions, data]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  // Calculate balance
  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>💰 Personal Finance Tracker</h2>
      <h3>Total Balance: ₹{total}</h3>

      <TransactionForm onAdd={addTransaction} />

      <ul>
        {transactions.map((tx) => (
          <li key={tx._id}>
            {tx.description}: ₹{tx.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
