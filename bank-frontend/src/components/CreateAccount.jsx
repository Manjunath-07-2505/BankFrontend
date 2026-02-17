import React, { useState } from "react";
import { createAccount } from "../services/AccountService";

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
        alert("Account Created Successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error creating account");
      });
  };

  return (
    <div>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="holderName"
          placeholder="Holder Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="accountType"
          placeholder="Account Type"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;
