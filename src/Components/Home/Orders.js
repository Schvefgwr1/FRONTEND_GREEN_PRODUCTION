import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import axios from "axios";
import {useEffect} from "react";
import {MyTitle} from "./Title";

function ListGood({good}) {
    return (
        <tr>
            <td>{good?.Name_of_Good}</td>
            <td>{good?.Price_for_Good}</td>
            <td>{good?.Weight_of_Good}</td>
            <td>{good?.Type_of_Packaging}</td>
        </tr>
    )
}

function ListElement({order}) {
    const ListOfAllGoods = order?.Goods.map((good)=>
        <ListGood good={good}/>
    )
    return(
        <tr>
            <td>{order?.id_Order}</td>
            <td>{order?.Name_of_Shop}</td>
            <td>{order?.Date_jf_Delivery}</td>
            <td>{order?.Status_of_Order}</td>
            <td>{order?.Employee}</td>
            <td>
                <table border="2" cellPadding="2">
                    <th>
                        <td>{order?.Letter?.Data_of_Letter}</td>
                        <td>{order?.Letter?.Text}</td>
                        <td>{order?.Letter?.Status}</td>
                        <td>{order?.Letter?.Reasons_Of_Letters}</td>
                    </th>
                </table>
            </td>
            {ListOfAllGoods}
        </tr>
    )
}

export default function Orders() {
    const navigate = useNavigate();
    const [state, setState]=useState('loading');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [response, setResponse] = useState([]);
    const [load, setLoad] = useState(0);
    const ListOfAllOrders = response.map((order)=>
        <ListElement order={order}/>
    )
    const goodsRequest = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'orders';
        let data = {
            access_code: cookies.token
        }
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                console.log('GRTTYYRTYUTYUYTRUTYUR')
                setResponse(res.data.Orders);
                setState('using')
            }
        ).catch(
            ()=>{
                console.log('error')
            }
        )

    }
    //load ???????????????? 0-1 ?????? 1-0 ?????? 1-2 ?? ??.??., ?????????? ????????????????????
    useEffect(() => {
        console.log('HISGHKORT-OIWRBHNO[EPRTJTGVW;RB.N')
        goodsRequest();
    }, [load]);

    if(state === 'using') {
        return (
            <div className="MAIN">

                {MyTitle()}

                <h5>Orders</h5>
                <table border="3" cellPadding="3">
                    <tr>
                        <td>Number</td>
                        <td>Name of shop</td>
                        <td>Date of delivery</td>
                        <td>Status of order</td>
                        <td>Employee</td>
                        <td>
                            <h5>Letter</h5>
                            <th>
                                <td>Data of letter</td>
                                <td>Text</td>
                                <td>Status</td>
                                <td>Reason of letter</td>
                            </th>
                        </td>
                        <td>
                            <h5>Goods</h5>
                            <table border="2" cellPadding="2">
                                <th>
                                    <td>Name of good</td>
                                    <td>Price for good</td>
                                    <td>Weight of good</td>
                                    <td>Type of packaging</td>
                                </th>
                            </table>
                        </td>
                    </tr>
                    {ListOfAllOrders}
                </table>
            </div>
        )
    }
    else
        if(state === 'loading') {
            return (
                <div className='main-box'>
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )
        }
}
