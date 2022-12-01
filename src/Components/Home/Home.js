import React from "react";
import Stock_Image from "../../Image/stock.png"
import Order_Image from "../../Image/order.png"
import  Planting_Image from "../../Image/planting.png"

export default function Home() {
    return(
        <div>
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <h5 class="my-0 mr-md-auto font-weight-normal">Green Production</h5>

                <nav className="my-2 my-md-0 mr-md-3">
                    <a className="p-2 text-dark" href="/home/orders">Orders</a>
                    <a className="p-2 text-dark" href="/home/goods">Goods</a>
                    <a className="p-2 text-dark" href="/home/employees">Employees</a>
                    <a className="p-2 text-dark" href="/home/stock">Stock</a>
                    <a className="p-2 text-dark" href="/home/plantings">Plantings</a>
                </nav>

                <a class="btn btn-outline-primary" href="/">LogOut</a>
            </div>

            <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 className="display-4 fw-normal">User`s home</h1>
                <p className="fs-5 text-muted">In this user interface you can get all information about production of green company.</p>
            </div>

            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Plantings</h4>
                        </div>
                        <div className="card-body">
                            <img src={Planting_Image} height="200px" width="400px" />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Stock</h4>
                        </div>
                        <div className="card-body">
                            <img src={Stock_Image} height="200px" width="400px" />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Orders</h4>
                        </div>
                        <div className="card-body">
                            <img src={Order_Image} height="200px" width="400px"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
