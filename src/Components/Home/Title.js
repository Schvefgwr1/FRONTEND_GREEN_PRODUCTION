import React from "react";

export function MyTitle() {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <h5 className="my-0 mr-md-auto font-weight-normal">Green Production</h5>

            <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href="/home">Home</a>
                <a className="p-2 text-dark" href="/home/orders">Orders</a>
                <a className="p-2 text-dark" href="/home/goods">Goods</a>
                <a className="p-2 text-dark" href="/home/employees">Employees</a>
                <a className="p-2 text-dark" href="/home/stock">Stock</a>
                <a className="p-2 text-dark" href="/home/plantings">Plantings</a>
            </nav>

            <a className="btn btn-outline-primary" href="/">LogOut</a>
        </div>
    )
}