import React from "react";

export function MyTitle() {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <h5 className="my-0 mr-md-auto font-weight-normal">Green Production</h5>

            <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href="/admin">Home</a>
                <a className="p-2 text-dark" href="/admin/order">Post Order</a>
                <a className="p-2 text-dark" href="/admin/good">Post Good</a>
                <a className="p-2 text-dark" href="/admin/employee">Post Employee</a>
                <a className="p-2 text-dark" href="/admin/stock">Post to Stock</a>
                <a className="p-2 text-dark" href="/admin/planting">Post Planting</a>
                <a className="p-2 text-dark" href="/admin/letter">Post Letter</a>
                <a className="p-2 text-dark" href="/admin/call_procedure">Call Procedures</a>
            </nav>

            <a className="btn btn-outline-primary" href="/">LogOut</a>
        </div>
    )
}