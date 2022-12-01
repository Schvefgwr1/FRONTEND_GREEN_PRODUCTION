import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import axios from "axios";
import {useEffect} from "react";

function ListElement({position}){
    return(
        <tr>
            <td>{position?.id_Position}</td>
            <td>{position?.Name_of_Position}</td>
            <td>{position?.Best_Before_Date}</td>
            <td>{position?.First_Name_and_Second_Name}</td>
            <td>{position?.Job_Title}</td>
        </tr>
    )
}

export default function Stock() {
    const navigate = useNavigate();
    const [state, setState]=useState('loading');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [response, setResponse] = useState([]);
    const [load, setLoad] = useState(0);
    const ListOfAllPlantings = response.map((position)=>
        <ListElement position={position}/>
    )
    const stockRequest = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'stock';
        let data = {
            access_code: cookies.token
        }
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                console.log('GRTTYYRTYUTYUYTRUTYUR')
                setResponse(res.data.positions);
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
        stockRequest();
    }, [load]);

    if(state === 'using') {
        return (
            <div>
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
                <h5>Stock</h5>
                <table border="3" cellPadding="3">
                    <tr>
                        <td>Number</td>
                        <td>Name of position</td>
                        <td>Best before date</td>
                        <td>Name of employee</td>
                        <td>Job title of employee</td>
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
