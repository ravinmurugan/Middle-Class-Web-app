import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useRouter } from 'next/router';

export default function AddExpense() {
  const [form, setForm] = useState({ category: '', amount: '', details: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('expenses').insert([{ 
      category: form.category,
      amount: parseFloat(form.amount),
      details: form.details,
      date_spent: new Date()
    }]);
    router.push('/dashboard');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Add Expense</h1>
      <form onSubmit={handleSubmit}>
        <input name="category" placeholder="Category" onChange={handleChange} /><br/>
        <input name="amount" type="number" placeholder="Amount" onChange={handleChange} /><br/>
        <input name="details" placeholder="Details (optional)" onChange={handleChange} /><br/>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}