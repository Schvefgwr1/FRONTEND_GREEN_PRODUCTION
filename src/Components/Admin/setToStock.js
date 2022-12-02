import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import axios from "axios";
import {useEffect} from "react";
import {MyTitle} from "./Export/Title";
import moment from "moment";

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

export default function SetToStock() {
    const navigate = useNavigate();
    const [state, setState]=useState('loading');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [response, setResponse] = useState([]);
    const [load, setLoad] = useState(0);
    const [name, setName] = useState();
    const [BBD, setBBD] = useState();
    const [idEmp, setIdEmp] = useState();

    const handleChangeName = event => {
        setName(event.target.value);
    };
    const handleChangeBBD = event => {
        setBBD(event.target.value);
    };
    const handleChangeID_Em = event => {
        setIdEmp(event.target.value);
    };

    const ListOfAllPlantings = response.map((position)=>
        <ListElement position={position}/>
    )

    const plantingRequest = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'new_in_stock';
        let string = new Date(BBD);
        let data = {
            'access_code': cookies.token,
            'Name': name,
            'id_Employee': idEmp,
            'Best_Before_Date': moment(string).format("yyyy-MM-DD HH:mm:ss").toString()
        }
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                console.log('GRTTYYRTYUTYUYTRUTYUR')
                setLoad(load + 1);
            }
        ).catch(
            (error)=>{
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

    const ComeBack = async () => {
        setState('loading');
        setLoad(load + 1);
    }

    switch(state) {
        case 'using':
            return (
                <div className="MAIN">

                    {MyTitle()}

                    <h2>Введите данные новой позиции</h2>
                    <div className="Lol2">
                        <h5>Введите Название позиции</h5>
                        <input className='input' type='text' value={name} onChange={handleChangeName} placeholder="Название"/>
                    </div>
                    <div className="Lol2">
                        <h5>Введите Дату окончания срока годности</h5>
                        <input className='input' type='datetime-local' value={BBD} onChange={handleChangeBBD} placeholder="Дата"/>
                    </div>
                    <h5>Введите ID Сотрудника</h5>
                    <input className='input' type='text' value={idEmp} onChange={handleChangeID_Em}
                           placeholder="ID сотрудника"/>
                    <div className="DivButton">
                        <button className='setbutton' onClick={plantingRequest}>Добавить позицию</button>
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
