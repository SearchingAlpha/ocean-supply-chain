/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          background: '#121212',
          foreground: '#e1e1e1',
          'terminal-blue': '#1a5fb4',
          'terminal-blue-light': '#3584e4',
          'terminal-green': '#2ec27e',
          'terminal-red': '#e01b24',
          'terminal-yellow': '#f5c211',
          'panel-bg': '#1e1e1e',
          'panel-border': '#333333',
          'input-bg': '#252525',
        },
        fontFamily: {
          mono: ['Roboto Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        },
        boxShadow: {
          'terminal': '0 0 10px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    plugins: [],
  };