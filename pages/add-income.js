import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useRouter } from 'next/router';

export default function AddIncome() {
  const [form, setForm] = useState({ source: '', type: '', sub_type: '', amount: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('income').insert([{ 
      source: form.source,
      type: form.type,
      sub_type: form.sub_type,
      amount: parseFloat(form.amount),
      date_received: new Date()
    }]);
    router.push('/dashboard');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Add Income</h1>
      <form onSubmit={handleSubmit}>
        <input name="source" placeholder="Source" onChange={handleChange} /><br/>
        <select name="type" onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="Employment">Employment</option>
          <option value="Contract">Contract</option>
          <option value="Business">Business</option>
        </select><br/>
        <input name="sub_type" placeholder="Sub-Type (optional)" onChange={handleChange} /><br/>
        <input name="amount" type="number" placeholder="Amount" onChange={handleChange} /><br/>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}