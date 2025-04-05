// File: app/page.js
'use client';
import dynamic from 'next/dynamic';

// Load the dashboard with no SSR
const MaritimeDashboard = dynamic(
  () => import('../components/MaritimeDashboard'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <MaritimeDashboard />
    </main>
  );
}