import './globals.css';

export const metadata = {
  title: 'SupportIQ — AI Customer Support Dashboard',
  description: 'AI-powered customer support tools for your team.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
