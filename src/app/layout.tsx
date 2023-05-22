import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartContextProvider } from "./context/cartContext";

export const metadata = {
  title: "Bean Palette",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartContextProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </CartContextProvider>
  );
}
