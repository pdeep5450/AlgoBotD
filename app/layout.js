export const metadata = {
  title: "AlgoBotD",
  description: "Trading Bot Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
