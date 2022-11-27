import React from "react";
import {BrowserRouter, Route, Routes, Navigate,} from "react-router-dom";
import Login from "./src/Components/Login/Login";
import Admin from "./src/Components/Admin/Admin";

export default function Routing() {
    return(
        //add anew path by using <Route/> element
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/admin" element={<Admin/>} />
            </Routes>
        </BrowserRouter>
    )
}
