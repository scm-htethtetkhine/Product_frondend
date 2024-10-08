import "./App.css";
import "./components/appStyles.css";
import "./css/carddesign.css";
import React from "react";
// import AuthForm from "./components/AuthForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axiosinterceptor from "./helper/axiosinterceptor";
import UserList from "./components/UserList";
import ProductEntry from "./components/ProductEntry";
import ProductList from "./components/ProductList";
import UserEntry from "./components/UserEntry";
import Showproduct from "./components/Showproduct";
import Formsalereceipt from "./components/Formsalereceipt";
import RouteGuard from "./components/RouteGuard";

function App() {
  axiosinterceptor();
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserEntry />} />
      <Route path="/showproduct" element={<Showproduct />} />
      <Route path="/products" element={<ProductEntry />} />
      <Route path="/products/list" element={<ProductList />} />
      <Route path="/products/edit/:id" element={<ProductEntry />} />
      {/* <Route path="/user/list" element={<UserList />} />
      <Route path="/user/edit/:id" element={<UserEntry />} /> */}
      <Route path="/salereceipt" element={<Formsalereceipt />} />

      <Route element={<RouteGuard allowedRoles={["Admin" , "Staff"]} />} >
      <Route path="/user/list" element={<UserList />} />
      <Route path="/user/edit/:id" element={<UserEntry />} />
      </Route>

      {/* <Route element={<RouteGuard allowedRoles={["Admin"]} />} >
      <Route path="/user/edit/:id" element={<UserEntry />} />
      </Route> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
