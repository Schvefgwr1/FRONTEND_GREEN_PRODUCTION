import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import axios from "axios";
import {useEffect} from "react";
import {MyTitle} from "./Export/Title";
import "../CSS/SetLetter.css"
import moment from "moment";

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

export default function SetLetter() {
    const navigate = useNavigate();
    const [state, setState]=useState('loading');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [response, setResponse] = useState([]);
    const [load, setLoad] = useState(0);
    const [Data, setData] = useState();
    const [text, setText] = useState();
    const [status, setStatus] = useState();
    const [id_R, setId_R] = useState();
    const [id_Or, setId_Or] = useState();

    const handleChangeData = event => {
        setData(event.target.value);
    };
    const handleChangeText = event => {
        setText(event.target.value);
    };
    const handleChangeStatus = event => {
        setStatus(event.target.value);
    };
    const handleChangeId_R = event => {
        setId_R(event.target.value);
    };
    const handleChangeId_Or = event => {
        setId_Or(event.target.value);
    };

    const ListOfAllOrders = response.map((order)=>
        <ListElement order={order}/>
    )

    const ordersRequest = async () => {
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

    const LetterRequest = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'new_letter';

        let string = new Date(Data);

        let data = {
            access_code: cookies.token,
            Data_of_Letter: moment(string).format("yyyy-MM-DD HH:mm:ss").toString(),
            Text: text,
            Status: status,
            id_Reason: id_R,
            id_Order: id_Or
        }
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                console.log('GRTTYYRTYUTYUYTRUTYUR')
                setLoad(load+1)
            }
        ).catch(
            (error)=>{
                if(error.response.status === 402) {
                    setState('error_402');
                }
                if(error.response.status === 406) {
                    setState('error_406');
                }
            }
        )

    }

    const ComeBack = async () => {
        setState('loading');
        setLoad(load + 1);
    }

    //load меняется 0-1 или 1-0 или 1-2 и т.д., тогда вызывается
    useEffect(() => {
        console.log('HISGHKORT-OIWRBHNO[EPRTJTGVW;RB.N')
        ordersRequest();
    }, [load]);

    switch(state) {
        case 'using':
            return (
                <div className="MAIN">

                    {MyTitle()}

                    <div>
                        <div className="Content1">
                            <h2>Введите данные нового письма</h2>
                            <div className="Lol2">
                                <h5>Введите Дату пиьма</h5>
                                <input className='input' type='datetime-local' value={Data} onChange={handleChangeData} placeholder="Дата"/>
                            </div>
                            <div className="Lol2">
                                <h5>Введите Текст письма</h5>
                                <input className='input' type='text' value={text} onChange={handleChangeText} placeholder="Текст"/>
                            </div>
                            <div>
                                <h5>Выберите статус письма</h5>
                                <div>
                                    <input className="Answer" type="radio" value="1" onChange={handleChangeStatus}/>
                                    <b>Обработано</b>
                                </div>
                                <div>
                                    <input className="Answer" type="radio" value="0" onChange={handleChangeStatus}/>
                                    <b>Необработано</b>
                                </div>
                            </div>
                        </div>
                        <div className="Content2">
                            <h5>Выберите причину</h5>
                            <div>
                                <input className="Answer" type="radio" value="1" onChange={handleChangeId_R}/>
                                <b>Loss of goods</b>
                            </div>
                            <div>
                                <input className="Answer" type="radio" value="2" onChange={handleChangeId_R}/>
                                <b>Goods damaged in transit</b>
                            </div>
                            <div>
                                <input className="Answer" type="radio" value="3" onChange={handleChangeId_R}/>
                                <b>Defective</b>
                            </div>
                            <div>
                                <input className="Answer" type="radio" value="4" onChange={handleChangeId_R}/>
                                <b>Delayed delivery</b>
                            </div>
                            <div className="Lol2">
                                <h5>Введите id заказа</h5>
                                <input className='input' type='text' value={id_Or} onChange={handleChangeId_Or} placeholder="ID Заказа"/>
                            </div>
                            <div className="DivButton">
                                <button className='setbutton' onClick={LetterRequest}>Добавить</button>
                            </div>
                        </div>
                    </div>

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
        case 'error_402':
            return (
                <div>
                    <h1>ERROR. YOU DON`T HAVE ROOT</h1>
                    <div className="DivButton">
                        <button className='setbutton' onClick={ComeBack}>Вернуться</button>
                    </div>
                </div>
            )
        case 'error_406':
            return (
                <div>
                    <h1>ERROR. INCORRECT ORDER</h1>
                    <div className="DivButton">
                        <button className='setbutton' onClick={ComeBack}>Вернуться</button>
                    </div>
                </div>
            )
    }
}
