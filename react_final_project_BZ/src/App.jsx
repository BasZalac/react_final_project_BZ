import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import WebshopForm from "./components/WebshopForm";
import { AuthProvider } from "./context/loginContext";
import ProtectedRoute from "./components/ProtectedRoute";
import WebshopList from "./components/WebshopList";
import Details from "./components/Details";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import "./App.css";
{
  /* asdasdsad*/
}
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const loadProducts = async () => {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    setProducts(data);
  };

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <WebshopList products={products} deleteProduct={deleteProduct} />
            }
          />
          <Route
            path="form"
            element={
              <ProtectedRoute>
                <WebshopForm sendDataToApp={loadProducts} />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="details/:id" element={<Details products={products} />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
