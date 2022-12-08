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
import SetEmployee from "./Components/Admin/setEmployee";
import SetGood from "./Components/Admin/setGood";
import SetLetter from "./Components/Admin/setLetter";
import SetOrder from "./Components/Admin/setOrder";
import SetPlanting from "./Components/Admin/setPlanting";
import SetToStock from "./Components/Admin/setToStock";
import CallProcedure from "./Components/Admin/CallProcedure";

export default function Routing() {
    return(
        //add anew path by using <Route/> element
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/admin" element={<Admin/>} />
                <Route path="/admin/employee" element={<SetEmployee/>} />
                <Route path="/admin/good" element={<SetGood/>} />
                <Route path="/admin/letter" element={<SetLetter/>} />
                <Route path="/admin/order" element={<SetOrder/>} />
                <Route path="/admin/planting" element={<SetPlanting/>} />
                <Route path="/admin/stock" element={<SetToStock/>} />
                <Route path="/admin/call_procedure" element={<CallProcedure/>} />

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
