// File: app/layout.jsx
import './globals.css';

export const metadata = {
  title: 'Maritime Traffic Terminal | Global Density Visualization',
  description: 'Bloomberg terminal-inspired visualization of maritime traffic patterns and density for commercial shipping routes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-foreground font-mono">
        {children}
      </body>
    </html>
  );
}