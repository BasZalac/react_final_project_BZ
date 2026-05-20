import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router'
import WebshopForm from './components/WebshopForm'
import { AuthProvider } from './context/loginContext'
import ProtectedRoute from './components/ProtectedRoute'
import WebshopList from './components/WebshopList'
import Details from './components/Details'
import Login from './components/Login'
import { useState, useEffect } from 'react'
import './App.css'
{/* asdasdsad*/}
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Hiba:", err));
  }, []);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<WebshopList products={products} deleteProduct={deleteProduct} />} />
          <Route path='form' element={<ProtectedRoute><WebshopForm sendDataToApp={addProduct} /></ProtectedRoute>} />
          <Route path='login' element={<Login />} />
          <Route path='details/:id' element={<Details />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App