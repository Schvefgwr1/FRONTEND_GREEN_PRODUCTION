import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import axios from "axios";
import {MyTitle} from "./Export/Title";

function ListElement({planting}){
    return(
        <tr>
            <td>{planting?.Temperature}</td>
            <td>{planting?.Illumination}</td>
            <td>{planting?.Wet}</td>
            <td>{planting?.Content_of_dangerous_bacteria}</td>
            <td>{planting?.Sufficient_fertilizer_content}</td>
            <td>{planting?.First_Name_and_Second_Name}</td>
            <td>{planting?.Job_Title}</td>
        </tr>
    )
}

export default function SetPlanting() {
    const navigate = useNavigate();
    const [state, setState]=useState('loading');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [response, setResponse] = useState([]);
    const [load, setLoad] = useState(0);
    const [temp, setTemp] = useState();
    const [illum, setIllum] = useState();
    const [wet, setWet] = useState();
    const [cont, setCont] = useState();
    const [suff, setSuff] = useState();
    const [id_Emp, setID_EMP] = useState();

    const handleChangeTemp = event => {
        setTemp(event.target.value);
    };
    const handleChangeIllum = event => {
        setIllum(event.target.value);
    };
    const handleChangeWet = event => {
        setWet(event.target.value);
    };
    const handleChangeCont = event => {
        setCont(event.target.value);
    };
    const handleChangeSuff = event => {
        setSuff(event.target.value);
    };
    const handleChangeID_Em = event => {
        setID_EMP(event.target.value);
    };

    const ListOfAllPlantings = response.map((planting)=>
        <ListElement planting={planting}/>
    )
    const plantingsRequest = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'plantings';
        let data = {
            access_code: cookies.token
        }
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                console.log('GRTTYYRTYUTYUYTRUTYUR')
                setResponse(res.data.Plantings);
                setState('using')
            }
        ).catch(
            ()=>{
                console.log('error')
            }
        )

    }

    const plantingRequest = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'new_planting';
        let data = {
            'access_code': cookies.token,
            'Temperature': temp,
            'Illumination': illum,
            'Wet': wet,
            'Content_of_dangerous_bacteria': cont,
            'Sufficient_fertilizer_content': suff,
            'id_Employee': id_Emp
        }
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                setLoad(load +1);
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

    //load меняется 0-1 или 1-0 или 1-2 и т.д., тогда вызывается
    useEffect(() => {
        console.log('HISGHKORT-OIWRBHNO[EPRTJTGVW;RB.N')
        plantingsRequest();
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

                    <div>
                        <div className="Content1">
                            <h2>Введите данные новой плантации</h2>
                            <div className="Lol2">
                                <h5>Введите Температуру</h5>
                                <input className='input' type='text' value={temp} onChange={handleChangeTemp}
                                       placeholder="Температура"/>
                            </div>
                            <div className="Lol2">
                                <h5>Введите Освещенность</h5>
                                <input className='input' type='text' value={illum} onChange={handleChangeIllum}
                                       placeholder="Освещенность"/>
                            </div>

                        </div>
                        <div className="Lol2">
                            <h5>Введите Влажность</h5>
                            <input className='input' type='text' value={wet} onChange={handleChangeWet}
                                   placeholder="Влажность"/>
                            <h5>Введите ID Сотрудника</h5>
                            <input className='input' type='text' value={id_Emp} onChange={handleChangeID_Em}
                                   placeholder="ID сотрудника"/>
                        </div>
                        <div>
                            <h5>Содержиться ли опасные бактерии?</h5>
                            <div>
                                <input className="Answer" type="radio" value="1" onChange={handleChangeCont}/>
                                <b>Да</b>
                            </div>
                            <div>
                                <input className="Answer" type="radio" value="0" onChange={handleChangeCont}/>
                                <b>Нет</b>
                            </div>
                        </div>
                        <div>
                            <h5>Необходимо ли добавить удобрения?</h5>
                            <div>
                                <input className="Answer" type="radio" value="1" onChange={handleChangeSuff}/>
                                <b>Да</b>
                            </div>
                            <div>
                                <input className="Answer" type="radio" value="0" onChange={handleChangeSuff}/>
                                <b>Нет</b>
                            </div>
                        </div>
                        <div className="DivButton">
                            <button className='setbutton' onClick={plantingRequest}>Добавить плантацию</button>
                        </div>
                    </div>

                    <h5>Plantings</h5>
                    <table border="3" cellPadding="3">
                        <tr>
                            <td>Temperature</td>
                            <td>Illumination</td>
                            <td>Wet</td>
                            <td>Content_of_dangerous_bacteria</td>
                            <td>Sufficient_fertilizer_content</td>
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
