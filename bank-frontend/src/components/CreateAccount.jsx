import React, { useState } from "react";
import { createAccount } from "../services/AccountService";
import "./CreateAccount.css";

function CreateAccount() {

  const [account, setAccount] = useState({
    accountNumber: "",
    holderName: "",
    email: "",
    accountType: ""
  });

  const handleChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createAccount(account)
      .then(() => {
        alert("✅ Account Created Successfully!");
        setAccount({
          accountNumber: "",
          holderName: "",
          email: "",
          accountType: ""
        });
      })
      .catch(() => {
        alert("❌ Error creating account");
      });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>🏦 Create Bank Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="accountNumber"
            placeholder="Account Number"
            value={account.accountNumber}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="holderName"
            placeholder="Holder Name"
            value={account.holderName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={account.email}
            onChange={handleChange}
            required
          />

          <select
            name="accountType"
            value={account.accountType}
            onChange={handleChange}
            required
          >
            <option value="">Select Account Type</option>
            <option value="SAVINGS">Savings</option>
            <option value="CURRENT">Current</option>
          </select>

          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
