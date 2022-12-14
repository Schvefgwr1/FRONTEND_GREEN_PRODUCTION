import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import axios from "axios";
import {useEffect} from "react";
import {MyTitle} from "./Title";

function ListElement({employee}){
    return(
        <tr>
            <td>{employee?.id_Employee}</td>
            <td>{employee?.First_Name_and_Second_Name}</td>
            <td>{employee?.Job_Title}</td>
            <td>{employee?.id_Planting}</td>
        </tr>
    )
}

export default function Employees() {
    const navigate = useNavigate();
    const [state, setState]=useState('loading');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [response, setResponse] = useState([]);
    const [load, setLoad] = useState(0);
    const ListOfAllPlantings = response.map((employee)=>
        <ListElement employee={employee}/>
    )
    const employeesRequest = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'employees';
        let data = {
            access_code: cookies.token
        }
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                console.log('GRTTYYRTYUTYUYTRUTYUR')
                setResponse(res.data.employees);
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
        employeesRequest();
    }, [load]);

    if(state === 'using') {
        return (
            <div className="MAIN">

                {MyTitle()}

                <h5>Employees</h5>
                <table border="3" cellPadding="3">
                    <tr>
                        <td>Number</td>
                        <td>Name of employee</td>
                        <td>Job title of employee</td>
                        <td>ID of planting if it has</td>
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
