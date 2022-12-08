import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import axios from "axios";
import {MyTitle} from "./Export/Title";
import "./../CSS/callProcedure.css";

function ListElement({take}){
    return(
        <tr>
            <td>{take?.Text}</td>
            <td>{take?.Status}</td>
        </tr>
    )
}

function ListElement2({take}){
    return(
        <tr>
            <td>{take?.id_Order}</td>
            <td>{take?.Date_jf_Delivery}</td>
        </tr>
    )
}

export default function CallProcedure() {
    const navigate = useNavigate();
    const [state, setState]=useState('loading');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [response, setResponse] = useState([]);
    const [load, setLoad] = useState(0);
    const [name, setName] = useState();
    const [name2, setName2] = useState();
    const [good, setGood] = useState();

    const handleChangeGood = event => {
        setGood(event.target.value);
    };

    const handleChangeName2 = event => {
        setName2(event.target.value);
    };

    const handleChangeName = event => {
        setName(event.target.value);
    };

    const ListOfAllPlantings = response.map((take)=>
        <ListElement take={take}/>
    )

    const ListOfAllPlantings2 = response.map((take)=>
        <ListElement2 take={take}/>
    )

    const Form = async () => {
        setState('start_using');
    }

    const callRequest = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'call_procedure';
        let data = {
            'access_code': cookies.token,
            'Name': name
        }
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                setResponse(res.data.result);
                setState('res_state');
                //setLoad(load +1);
            }
        ).catch(
            (error)=>{
                if(error.response.status === 440) {
                    setState('error_440');
                }
                if(error.response.status === 402) {
                    setState('error_402');
                }
                console.log('error')
            }
        )

    }

    const callOrder = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'find_order';
        let data = {
            'access_code': cookies.token,
            'Good': good,
            'Employee': name2
        }
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                setResponse(res.data.result);
                setState('res_state2');
                //setLoad(load +1);
            }
        ).catch(
            (error)=>{
                if(error.response.status === 440) {
                    setState('error_440');
                }
                if(error.response.status === 402) {
                    setState('error_402');
                }
                console.log('error')
            }
        )

    }

    const callTemp = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'get_temp';
        let data = {
            'access_code': cookies.token,
        }
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                setResponse(res.data.result);
                setState('res_state3');
                //setLoad(load +1);
            }
        ).catch(
            (error)=>{
                if(error.response.status === 402) {
                    setState('error_402');
                }
                console.log('error')
            }
        )

    }

    //load меняется 0-1 или 1-0 или 1-2 и т.д., тогда вызывается
    useEffect(() => {
        console.log('HISGHKORT-OIWRBHNO[EPRTJTGVW;RB.N')
        Form();
    }, [load]);

    const ComeBack = async () => {
        setState('loading');
        setLoad(load + 1);
    }

    switch(state) {
        case 'start_using':
            return (
                <div className="MAIN">

                    {MyTitle()}

                    <div>
                        <div>
                            <h2>Введите имя магазина</h2>
                            <div className="Lol2">
                                <input className='input' type='text' value={name} onChange={handleChangeName}
                                       placeholder="Имя"/>
                            </div>

                            <div className="DivButton">
                                <button className='setbutton' onClick={callRequest}>Выполнить поиск писем</button>
                            </div>
                        </div>
                        <div className="Second">
                            <h2>Введите параметры заказа</h2>
                            <div className="Lol2">
                                <input className='input' type='text' value={name2} onChange={handleChangeName2}
                                       placeholder="Имя сотрудника"/>
                            </div>
                            <div>
                                <input className='input' type='text' value={good} onChange={handleChangeGood}
                                       placeholder="Имя товара"/>
                            </div>

                            <div className="DivButton">
                                <button className='setbutton' onClick={callOrder}>Поиск заказов</button>
                            </div>
                        </div>
                        <div className="Third">
                            <h2>Посчитать среднюю температуру</h2>
                            <div className="DivButton">
                                <button className='setbutton' onClick={callTemp}>Выполнить</button>
                            </div>
                        </div>
                    </div>

                </div>
            )
        case 'res_state':
            return (
                <div className="MAIN">

                    {MyTitle()}

                    <h5>Letters</h5>
                    <table border="3" cellPadding="3">
                        <tr>
                            <td>Text</td>
                            <td>Status</td>
                        </tr>
                        {ListOfAllPlantings}
                    </table>
                    <button className='setbutton' onClick={ComeBack}>Вернуться к вызовам</button>
                </div>
            )
        case 'res_state2':
            return (
                <div className="MAIN">

                    {MyTitle()}

                    <h5>Orders</h5>
                    <table border="3" cellPadding="3">
                        <tr>
                            <td>id_Order</td>
                            <td>Date of delivery</td>
                        </tr>
                        {ListOfAllPlantings2}
                    </table>
                    <button className='setbutton' onClick={ComeBack}>Вернуться к вызовам</button>
                </div>
            )
        case 'res_state3':
            return (
                <div className="MAIN">

                    {MyTitle()}

                    <h5>Средняя температура</h5>
                    <table border="3" cellPadding="3">
                        <tr>
                            <td>Middle Temperature</td>
                        </tr>
                        <tr>
                            <td>{response[0]?.MiddleTemperature}</td>
                        </tr>
                    </table>
                    <button className='setbutton' onClick={ComeBack}>Вернуться к вызовам</button>
                </div>
            )
        case 'loading':
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
        case 'error_440':
            return (
                <div>
                    <h1>ERROR. INCORRECT INPUT</h1>
                    <div className="DivButton">
                        <button className='setbutton' onClick={ComeBack}>Вернуться</button>
                    </div>
                </div>
            )
        case 'error_402':
            return (
                <div>
                    <h1>ERROR. DON`T HAVE ROOT</h1>
                    <div className="DivButton">
                        <button className='setbutton' onClick={ComeBack}>Вернуться</button>
                    </div>
                </div>
            )
    }
}