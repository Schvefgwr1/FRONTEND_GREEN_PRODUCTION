import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import axios from "axios";
import {useEffect} from "react";

function ListElement({good}){
    return(
        <tr>
            <td>{good?.id_Good}</td>
            <td>{good?.Name_of_Good}</td>
            <td>{good?.Price_for_Good}</td>
            <td>{good?.Weight_of_Good}</td>
            <td>{good?.Type_of_Packaging}</td>
        </tr>
    )
}

export default function Goods() {
    const navigate = useNavigate();
    const [state, setState]=useState('loading');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [response, setResponse] = useState([]);
    const [load, setLoad] = useState(0);
    const ListOfAllPlantings = response.map((good)=>
        <ListElement good={good}/>
    )
    const goodsRequest = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'goods';
        let data = {
            access_code: cookies.token
        }
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                console.log('GRTTYYRTYUTYUYTRUTYUR')
                setResponse(res.data.goods);
                setState('using')
            }
        ).catch(
            ()=>{
                console.log('error')
            }
        )

    }
    //load меняется 0-1 или 1-0 или 1-2 и т.д., тогда вызывается
    useEffect(() => {
        console.log('HISGHKORT-OIWRBHNO[EPRTJTGVW;RB.N')
        goodsRequest();
    }, [load]);

    if(state === 'using') {
        return (
            <div>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <h5 class="my-0 mr-md-auto font-weight-normal">Green Production</h5>

                    <nav className="my-2 my-md-0 mr-md-3">
                        <a className="p-2 text-dark" href="/home">Home</a>
                        <a className="p-2 text-dark" href="/home/orders">Orders</a>
                        <a className="p-2 text-dark" href="/home/goods">Goods</a>
                        <a className="p-2 text-dark" href="/home/employees">Employees</a>
                        <a className="p-2 text-dark" href="/home/stock">Stock</a>
                        <a className="p-2 text-dark" href="/home/plantings">Plantings</a>
                    </nav>

                    <a class="btn btn-outline-primary" href="/">LogOut</a>
                </div>
                <h5>Goods</h5>
                <table border="3" cellPadding="3">
                    <tr>
                        <td>Number</td>
                        <td>Name of good</td>
                        <td>Price for good</td>
                        <td>Weight of good</td>
                        <td>Type of packaging</td>
                    </tr>
                    {ListOfAllPlantings}
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
