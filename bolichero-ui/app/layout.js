import './globals.css';

export const metadata = {
  title: 'CRUD Comentarios',
  description: 'CRUD para comentarios en Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}