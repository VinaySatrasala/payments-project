import { useState, useEffect } from "react";
import { Card } from "@repo/ui/CardTable";
import axios from "axios";

export default function BankPage() {
  const [balance, setBalance] = useState(0);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Extract token and id from query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    const idParam = urlParams.get("id");

    if (tokenParam && idParam) {
      setToken(tokenParam);
      setId(idParam);
    } else {
      setError("Missing token or ID in the query parameters.");
    }
  }, []);

  const handleSend = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/transaction", {
        token,
        id,
        amount: parseFloat(amount),
      });

      setMessage(response.data.message || "Transaction successful!");
      setBalance((prev) => prev + parseFloat(amount)); // Mock balance update
      setError("");
    } catch (err : any) {
      setMessage("");
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <Card className="p-6 bg-gray-100 shadow-lg max-w-lg mx-auto rounded-lg">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Bank Transaction
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Disclaimer: This page is a simulation and does not represent a real bank.
        </p>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {message && <p className="text-green-500 text-sm mb-2">{message}</p>}
      <div className="mb-4">
        <p className="text-gray-700 mb-2">ID: {id}</p>
        <p className="text-gray-700 mb-2">Token: {token}</p>
        <p className="text-gray-700 mb-2">Balance: ${balance.toFixed(2)}</p>
      </div>
      <div className="flex flex-col space-y-4">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </Card>
  );
}
