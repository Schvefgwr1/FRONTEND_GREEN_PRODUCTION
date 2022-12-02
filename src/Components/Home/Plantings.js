import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import axios from "axios";
import {MyTitle} from "./Title";

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

export default function Plantings() {
    const navigate = useNavigate();
    const [state, setState]=useState('loading');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [response, setResponse] = useState([]);
    const [load, setLoad] = useState(0);
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
    //load меняется 0-1 или 1-0 или 1-2 и т.д., тогда вызывается
    useEffect(() => {
        console.log('HISGHKORT-OIWRBHNO[EPRTJTGVW;RB.N')
        plantingsRequest();
    }, [load]);

    if(state === 'using') {
        return (
            <div className="MAIN">

                {MyTitle()}

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
    }
    else
        if(state === 'loading')
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
