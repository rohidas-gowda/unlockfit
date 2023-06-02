import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CustomerDashboard from "./pages/CustomerDashboard";

const App = () => {
  return <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" exact Component={Login} />
      <Route path="/customer-dashboard" exact Component={CustomerDashboard} />
      </Routes>
      </BrowserRouter>
  </div>
}

export default App