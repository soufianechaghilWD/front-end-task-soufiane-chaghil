import React, { Component } from "react";
import "./App.css";
import Category_Page from "./pages/CategoryPage";
import Product_Page from "./pages/ProductPage";
import Cart_Page from "./pages/CartPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/cart" element={<Cart_Page />} />
            <Route path="/product" element={<Product_Page />} />
            <Route path="/" element={<Category_Page />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
