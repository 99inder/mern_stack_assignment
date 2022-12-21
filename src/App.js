import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Home, Navbar, About, Login, Alert, Signup, Cart, Checkout, MyOrders, ErrorPage } from './components/index.js';
import "../src/main-container.css";

const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <>
      <Navbar showAlert={showAlert} />
      <div className="main-container">
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert} />} />
            <Route exact path='/login' element={<Login showAlert={showAlert} />} />
            <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/cart' element={<Cart showAlert={showAlert} />} />
            <Route exact path='/checkout' element={<Checkout showAlert={showAlert} />} />
            <Route exact path='/myorders' element={<MyOrders showAlert={showAlert} />} />
            <Route exact path='*' element={<ErrorPage/>} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App