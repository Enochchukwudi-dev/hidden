import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import Faq from "./pages/Faq";
import Checkout from "./components/Checkout";
import Dynamic from "./components/Dynamic";

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-10">
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<Dynamic />} />
          <Route path="collections" element={<Collections />} />
          <Route path="faq" element={<Faq />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;