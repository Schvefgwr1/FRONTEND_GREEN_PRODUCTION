import React from "react";
import Planting_Image from "../../Image/planting.png";
import Stock_Image from "../../Image/stock.png";
import Order_Image from "../../Image/order.png";
import {MyTitle} from "./Export/Title";

export default function Admin() {
    return(
        <div className="MAIN">

            {MyTitle()}

            <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 className="display-4 fw-normal">Admin`s home</h1>
                <p className="fs-5 text-muted">In this admin interface you can get all information about production of
                    green company and post information in database.</p>
            </div>

            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Plantings</h4>
                        </div>
                        <div className="card-body">
                            <img src={Planting_Image} height="200px" width="400px"/>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Stock</h4>
                        </div>
                        <div className="card-body">
                            <img src={Stock_Image} height="200px" width="400px"/>
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
