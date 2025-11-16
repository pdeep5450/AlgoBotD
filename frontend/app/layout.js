import "./globals.css";

export const metadata = {
  title: "AlgoBotD",
  description: "Algo trading platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
