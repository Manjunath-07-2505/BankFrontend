import React, { useState , useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import adminImage from "../assets/admin.jpeg";

function Dashboard() {
  const [modalType, setModalType] = useState(null);
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState([]);

  const BASE_URL = "http://localhost:9090/api/accounts";

  const closeModal = () => {
    setModalType(null);
    setAccount("");
    setAmount("");
    setReceiver("");
  };

  useEffect(() => {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
     this.speedY = Math.random() * 0.3 + 0.1;
    }

    update() {
      this.y -= this.speedY;
      if (this.y < 0) {
        this.y = canvas.height;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.fillStyle = "rgba(255, 200, 80, 0.7)";
      ctx.shadowColor = "rgba(255, 180, 50, 0.9)";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

}, []);

  // ✅ TRANSACTION FUNCTION (OUTSIDE handleSubmit)
  const viewTransactions = async () => {
    const acc = prompt("Enter Account Number:");

    try {
      const res = await axios.get(
        `${BASE_URL}/transactions/${acc}`
      );
      setTransactions(res.data);
      setModalType("transactions");
    } catch {
      alert("Failed to fetch transactions ❌");
    }
  };

  const handleSubmit = async () => {
    try {
      if (modalType === "deposit") {
        await axios.put(`${BASE_URL}/deposit/${account}/${amount}`);
        setMessage("Deposit Successful ✅");
      }

      if (modalType === "withdraw") {
        await axios.put(`${BASE_URL}/withdraw/${account}/${amount}`);
        setMessage("Withdraw Successful ✅");
      }

      if (modalType === "transfer") {
        await axios.put(
          `${BASE_URL}/transfer/${account}/${receiver}/${amount}`
        );
        setMessage("Transfer Successful ✅");
      }

      if (modalType === "balance") {
        const res = await axios.get(`${BASE_URL}/${account}`);
        setMessage("Balance: ₹ " + res.data.balance);
      }

      closeModal();
    } catch {
      setMessage("Operation Failed ❌");
      closeModal();
    }
  };

  return (
    <div className="dashboard">
      <canvas id="particleCanvas"></canvas>
      <div className="overlay">

        {/* LEFT SIDE */}
        <div className="card">
          <h1>🏦 Bank Dashboard</h1>

          <button onClick={() => setModalType("deposit")}>Deposit</button>
          <button onClick={() => setModalType("withdraw")}>Withdraw</button>
          <button onClick={() => setModalType("balance")}>Check Balance</button>
          <button onClick={() => setModalType("transfer")}>Transfer</button>
          <button onClick={viewTransactions}>View Transactions</button>

          <p className="message">{message}</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="right">
          <img src={adminImage} alt="Admin" className="admin-img" />
          <h2 className="admin-text">ADMIN</h2>
        </div>
      </div>

      {/* NORMAL MODAL */}
      {modalType &&
        modalType !== "transactions" && (
          <div className="modal">
            <div className="modal-content">
              <h2>{modalType.toUpperCase()}</h2>

              <input
                type="text"
                placeholder="Account Number"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />

              {(modalType === "deposit" ||
                modalType === "withdraw" ||
                modalType === "transfer") && (
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              )}

              {modalType === "transfer" && (
                <input
                  type="text"
                  placeholder="Receiver Account"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                />
              )}

              <div className="modal-buttons">
                <button onClick={handleSubmit}>Submit</button>
                <button className="cancel" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      {/* TRANSACTION MODAL */}
      {modalType === "transactions" && (
        <div className="modal">
          <div className="modal-content large-modal">
            <h2>Transaction History</h2>

            <table className="transaction-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Account</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{tx.id}</td>
                    <td>{tx.accountNumber}</td>
                    <td>{tx.type}</td>
                    <td>₹ {tx.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;