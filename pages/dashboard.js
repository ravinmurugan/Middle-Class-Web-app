import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

export default function Dashboard() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: incomeData } = await supabase.from('income').select('*');
      const { data: expensesData } = await supabase.from('expenses').select('*');
      setIncome(incomeData || []);
      setExpenses(expensesData || []);
    };
    fetchData();
  }, []);

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <h2>Total Income: ${totalIncome.toFixed(2)}</h2>
      <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>

      <h3>Income Entries:</h3>
      {income.map(item => (
        <div key={item.id}>{item.source} - ${item.amount}</div>
      ))}

      <h3>Expense Entries:</h3>
      {expenses.map(item => (
        <div key={item.id}>{item.category} - ${item.amount}</div>
      ))}
    </div>
  );
}