/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Importante para o botão de Modo Escuro funcionar
  theme: {
    extend: {},
  },
  plugins: [],
}