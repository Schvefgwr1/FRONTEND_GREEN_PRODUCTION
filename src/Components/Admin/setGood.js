import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import axios from "axios";
import {useEffect} from "react";
import {MyTitle} from "./Export/Title";

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

export default function SetGood() {
    const navigate = useNavigate();
    const [state, setState]=useState('loading');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [response, setResponse] = useState([]);
    const [load, setLoad] = useState(0);
    const [name, setName] = useState();
    const [Price, setPrice] = useState();
    const [Weight, setWeight] = useState();
    const [TypeP, setTypeP] = useState();

    const handleChangeName = event => {
        setName(event.target.value);
    };
    const handleChangePrice = event => {
        setPrice(event.target.value);
    };
    const handleChangeWeight = event => {
        setWeight(event.target.value);
    };
    const handleChangeTypeP = event => {
        setTypeP(event.target.value);
    };
    const ListOfAllPlantings = response.map((good)=>
        <ListElement good={good}/>
    )

    const goodRequest = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'new_good';
        let data = {
            access_code: cookies.token,
            Name_of_Good: name,
            Price_for_Good: Price,
            Weight_of_Good: Weight,
            Type_of_Packaging: TypeP
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
            () => {
                console.log('error')
            }
        )
    }

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

    const ComeBack = async () => {
        setLoad(load+1);
    }

    if(state === 'using') {
        return (
            <div className="VsaStr">
                {MyTitle()}

                <div className="Form1">
                    <h2>Введите данные нового вида товара</h2>
                    <div className="Lol1">
                        <h5>Введите имя</h5>
                        <input className='input' value={name} onChange={handleChangeName} placeholder="Имя товара"/>
                    </div>
                    <h5>Введите цену на товар</h5>
                    <div>
                        <input className='input' value={Price} onChange={handleChangePrice} placeholder="Цена товара"/>
                    </div>
                    <h5>Введите вес товара</h5>
                    <div>
                        <input className='input' value={Weight} onChange={handleChangeWeight} placeholder="Вес товара"/>
                    </div>
                    <h5>Введите тип упаковки</h5>
                    <div>
                        <input className='input' value={TypeP} onChange={handleChangeTypeP} placeholder="Тип упаковки"/>
                    </div>
                    <div className="DivButton">
                        <button className='setbutton' onClick={goodRequest}>Добавить</button>
                    </div>
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
    else {
        if (state === 'loading') {
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
}
