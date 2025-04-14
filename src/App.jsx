import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [expenses, setExpenses] = useState([
    {
      description: "Light Mukumu",
      notes: "Wednesday’s Lunch",
      category: "food",
      amount: 100,
      date: "2025-04-08",
    },
    {
      description: "NYC Sewers",
      notes: "power tokens",
      category: "utilities",
      amount: 2000,
      date: "2025-04-05",
    },
  ]);

  const [formData, setFormData] = useState({
    description: "",
    notes: "",
    category: "",
    amount: "",
    date: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { ...formData, amount: parseFloat(formData.amount) }]);
    setFormData({ description: "", notes: "", category: "", amount: "", date: "" });
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f1f1f1"}}>
      <div style={{ width: "300px", padding: "40px", background: "#fff", boxShadow: "3px 0 5px rgba(0,0,0,0.05)"}}>
        <ExpenseForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
      </div>
      <div style={{ flex: 1, padding: "40px" }}>
        <h1>Expense Tracker</h1>
        <p>Start keeping control of your finances.</p>
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <ExpenseTable expenses={filteredExpenses} />
      </div>
    </div>
  );
};

export default App;