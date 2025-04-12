import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Middle Class – Home</h1>
      <ul>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/add-income">Add Income</Link></li>
        <li><Link href="/add-expense">Add Expense</Link></li>
      </ul>
    </div>
  );
}