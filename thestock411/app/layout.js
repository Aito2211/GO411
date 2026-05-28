import './globals.css';

export const metadata = {
  title: 'TheStock411 | Stock Market News, Data & Filings',
  description: 'A one-stop market intelligence dashboard for stock news, data, SEC filings, earnings, and trends.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
