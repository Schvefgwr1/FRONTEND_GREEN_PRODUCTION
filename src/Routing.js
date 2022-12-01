import React from "react";
import {BrowserRouter, Route, Routes, Navigate,} from "react-router-dom";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin";
import Home from "./Components/Home/Home";
import Orders from "./Components/Home/Orders";
import Plantings from "./Components/Home/Plantings";
import Stock from "./Components/Home/Stock";
import Employees from "./Components/Home/Employees";
import Goods from "./Components/Home/Goods";

export default function Routing() {
    return(
        //add anew path by using <Route/> element
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/admin" element={<Admin/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/home/orders" element={<Orders/>} />
                <Route path="/home/plantings" element={<Plantings/>} />
                <Route path="/home/stock" element={<Stock/>} />
                <Route path="/home/employees" element={<Employees/>} />
                <Route path="/home/goods" element={<Goods/>} />
            </Routes>
        </BrowserRouter>
    )
}
