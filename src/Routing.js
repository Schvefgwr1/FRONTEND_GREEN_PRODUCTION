import React from "react";
import {BrowserRouter, Route, Routes, Navigate,} from "react-router-dom";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin";
import Home from "./Components/Home/Home";

export default function Routing() {
    return(
        //add anew path by using <Route/> element
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/admin" element={<Admin/>} />
                <Route path="/home" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    )
}
