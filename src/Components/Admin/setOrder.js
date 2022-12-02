import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import axios from "axios";
import {useEffect} from "react";
import {MyTitle} from "./Export/Title";
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

export default function SetOrder() {
    const navigate = useNavigate();
    const [state, setState]=useState('loading');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [response, setResponse] = useState([]);
    const [load, setLoad] = useState(0);
    const [Goods, setGood] = useState([]);
    const [name, setName] = useState();
    const [date, setDate] = useState();
    const [status, setStatus] = useState();
    const [Id_Em, setID_Em] = useState();
    const [Id_Good, setID_Good] = useState();
    const [GoodsKol, setGoodsKol] = useState(0);

    const handleChangeGoods = event => {
        let buffer = Goods;
        buffer.push(event.target.value);
        setGood(buffer);
        console.log(Goods);
    };
    const handleChangeName = event => {
        setName(event.target.value);
    };
    const handleChangeGoodsKol = event => {
        setGoodsKol(event.target.value);
    };
    const handleChangeDate = event => {
        setDate(event.target.value);
    };
    const handleChangeStatus = event => {
        setStatus(event.target.value);
    };
    const handleChangeID_Em = event => {
        setID_Em(event.target.value);
    };
    const handleChangeID_Good = event => {
        setID_Good(event.target.value);
    };


    const ListOfAllOrders = response.map((order)=>
        <ListElement order={order}/>
    )

    const OrderRequest = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'new_order';
        let string = new Date(date);
        let data = {
            'access_code': cookies.token,
            'Name_of_Shop': name,
            'Date_jf_Delivery': moment(string).format("yyyy-MM-DD HH:mm:ss").toString(),
            'Status_of_Order': status,
            'Goods': Goods,
            'id_Employee': Id_Em
        }
        console.log(data);
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                console.log('GRTTYYRTYUTYUYTRUTYUR')
                setLoad(load +1);
            }
        ).catch(
            (error)=>{
                if(error.response.status === 405) {
                    setState('error_405');
                }
                if(error.response.status === 403) {
                    setState('error_403');
                }
                if(error.response.status === 402) {
                    setState('error_402');
                }
                console.log('error')
            }
        )

    }

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

    const ComeBack = async () => {
        setState('loading');
        setLoad(load + 1);
    }

    //load меняется 0-1 или 1-0 или 1-2 и т.д., тогда вызывается
    useEffect(() => {
        console.log('HISGHKORT-OIWRBHNO[EPRTJTGVW;RB.N')
        goodsRequest();
    }, [load]);

    switch(state) {
        case 'using':
            return (
                <div className="MAIN">

                    {MyTitle()}

                    <div>
                        <div className="Content1">
                            <h2>Введите данные нового заказа</h2>
                            <div className="Lol2">
                                <h5>Введите Название магазина</h5>
                                <input className='input' type='text' value={name} onChange={handleChangeName} placeholder="Имя магазина"/>
                            </div>
                            <div className="Lol2">
                                <h5>Введите Дату доставки</h5>
                                <input className='input' type='datetime-local' value={date} onChange={handleChangeDate} placeholder="Дата"/>
                            </div>
                            <div>
                                <h5>Выберите статус заказа</h5>
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
                        <div className="Lol2">
                            <h5>Введите ID сотрудника</h5>
                            <input className='input' type='text' value={Id_Em} onChange={handleChangeID_Em} placeholder="ID сотрудника"/>
                        </div>
                        <div className="DivButton">
                            <h5>Введите ID 1 товара</h5>
                            <input className='input' type='text' onChange={handleChangeGoods} placeholder="ID Товара"/>
                            <h5>Введите ID 2 товара</h5>
                            <input className='input' type='text' onChange={handleChangeGoods} placeholder="ID Товара"/>
                        </div>
                        <div className="DivButton">
                            <button className='setbutton' onClick={OrderRequest}>Добавить заказ</button>
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
        case 'error_405':
            return (
                <div>
                    <h1>ERROR. INCORRECT GOODS</h1>
                    <div className="DivButton">
                        <button className='setbutton' onClick={ComeBack}>Вернуться</button>
                    </div>
                </div>
            )
        case 'error_403':
            return (
                <div>
                    <h1>ERROR. INCORRECT EMPLOYEE</h1>
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
