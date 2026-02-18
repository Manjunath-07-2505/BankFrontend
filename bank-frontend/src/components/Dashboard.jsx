import React, { useState } from "react";
import axios from "axios";
import bankImage from "../assets/bank.png";
import "./Dashboard.css";

function Dashboard() {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [receiverAccount, setReceiverAccount] = useState("");
  const [message, setMessage] = useState("");

  const BASE_URL = "http://localhost:9090/api/accounts";

  const deposit = async () => {
    try {
      await axios.put(`${BASE_URL}/deposit/${accountNumber}/${amount}`);
      setMessage("Deposit Successful ✅");
    } catch {
      setMessage("Deposit Failed ❌");
    }
  };

  const withdraw = async () => {
    try {
      await axios.put(`${BASE_URL}/withdraw/${accountNumber}/${amount}`);
      setMessage("Withdraw Successful ✅");
    } catch {
      setMessage("Withdraw Failed ❌");
    }
  };

  const checkBalance = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${accountNumber}`);
      setMessage("Balance: ₹ " + res.data.balance);
    } catch {
      setMessage("Account Not Found ❌");
    }
  };

  const transfer = async () => {
    try {
      await axios.put(
        `${BASE_URL}/transfer/${accountNumber}/${receiverAccount}/${amount}`
      );
      setMessage("Transfer Successful ✅");
    } catch {
      setMessage("Transfer Failed ❌");
    }
  };

  const getTransactions = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/transactions/${accountNumber}`
      );
      console.log(res.data);
      setMessage("Transactions loaded in console 📜");
    } catch {
      setMessage("Failed to fetch transactions ❌");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <div className="left-section">
        <h1>🏦 Bank Dashboard</h1>

        <input
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          placeholder="Receiver Account (For Transfer)"
          value={receiverAccount}
          onChange={(e) => setReceiverAccount(e.target.value)}
        />

        <div className="button-group">
          <button onClick={deposit}>Deposit</button>
          <button onClick={withdraw}>Withdraw</button>
          <button onClick={checkBalance}>Check Balance</button>
          <button onClick={transfer}>Transfer</button>
          <button onClick={getTransactions}>View Transactions</button>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

        <h3>{message}</h3>
      </div>

      <div className="right-section">
        <img src={bankImage} alt="Bank" className="bank-image" />
      </div>
    </div>
  );
}

export default Dashboard;
