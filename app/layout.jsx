import "@styles/globals.css";

export const metadata = {
  title: "Promptia",
  description: "Discover and share A.I prompts.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
          <main className="app">{children}</main>
        </div>
      </body>
    </html>
  );
}
