import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

export default function Dashboard() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: incomeData } = await supabase.from('income').select('*');
      const { data: expensesData } = await supabase.from('expenses').select('*');
      const { data: debtsData } = await supabase.from('debts').select('*');
      setIncome(incomeData || []);
      setExpenses(expensesData || []);
      setDebts(debtsData || []);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Middle Class – Dashboard</h1>
      <h2>Income</h2>
      {income.map(item => (
        <div key={item.id}>{item.source}: ${item.amount}</div>
      ))}
      <h2>Expenses</h2>
      {expenses.map(item => (
        <div key={item.id}>{item.category}: ${item.amount}</div>
      ))}
      <h2>Debts</h2>
      {debts.map(item => (
        <div key={item.id}>{item.name}: ${item.balance}</div>
      ))}
    </div>
  );
}