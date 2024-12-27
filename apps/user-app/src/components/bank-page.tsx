"use client";
import { useState, useEffect } from "react";
import { Card } from "@repo/ui/CardTable";
import axios from "axios";
import { Button } from "@repo/ui/Button";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BankPage() {
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Extract token and id from query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    const idParam = urlParams.get("id");
    const amountParam = urlParams.get("amount");
    if (tokenParam && idParam) {
      setToken(tokenParam);
      setId(idParam);
      setAmount(amountParam || "0");
    } else {
      setError("Missing token or ID in the query parameters.");
    }
  }, []);

  const handleSend = async () => {
    try {
      const response = await axios.post("/api/bankwebhook", {
        token,
        id,
        amount: parseFloat(amount),
      });

      setMessage(response.data.message || "Transaction successful!");
      setError("");
      toast.success(response.data.message || "Transaction successful!"); // Show success toast

      // Redirect after showing toast
      setTimeout(() => {
        router.push("/deposits");
      }, 2000);
    } catch (err: any) {
      setMessage("");
      setError(err.response?.data?.message || "An error occurred.");
      toast.error(err.response?.data?.message || "An error occurred."); // Show error toast
    }
  };

  return (
    <Card className="w-1/2">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">
          Bank Transaction
        </h1>
        <p className="text-lg  mb-4">
          Disclaimer: This page is a simulation and does not represent a real bank.
        </p>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {message && <p className="text-green-500 text-sm mb-2">{message}</p>}
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold mb-2">
          Wallet Req for : {amount}
        </h1>
        <Button
          onClick={handleSend}
          className="text-black py-2 px-4 rounded-md hover:bg-green-500 focus:outline-none w-1/2"
        >
          Send
        </Button>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop closeButton />
    </Card>
  );
}
