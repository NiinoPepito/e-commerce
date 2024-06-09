import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ConnexionPage from "./page/ConnexionPage.jsx";
import HomePage from "./page/HomePage.jsx";
import ProductsPage from "./page/ProductsPage.jsx";
import ProductPage from "./page/ProductPage.jsx";
import OrderPage from "./page/OrderPage.jsx";
import ProfilPage from "./page/ProfilPage.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import AdminPage from "./page/AdminPage.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/connexion" element={<ConnexionPage />} />
              <Route path="/inscription" element={<RegisterPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/admin" element={<AdminPage />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
