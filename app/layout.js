// File: app/layout.jsx
import './globals.css';

export const metadata = {
  title: 'Global Maritime Traffic Density Visualization',
  description: 'Visualize maritime traffic patterns and density for commercial shipping routes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        {children}
      </body>
    </html>
  );
}