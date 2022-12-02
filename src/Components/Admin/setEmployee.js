import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import axios from "axios";
import {useEffect} from "react";
import "./../CSS/SetEmloyee.css";
import {MyTitle} from "./Export/Title.js";

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

export default function SetEmployee() {
    const navigate = useNavigate();
    const [state, setState]=useState('loading');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [response, setResponse] = useState([]);
    const [load, setLoad] = useState(0);
    const [name, setName] = useState();
    const [JobTitle, setJobTitle] = useState();

    const handleChangeJobTitle = event => {
        setJobTitle(event.target.value);
    };
    const handleChangeName = event => {
        setName(event.target.value);
    };
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
                setResponse(res.data.employees)
                setState('using')
            }
        ).catch(
            ()=>{
                console.log('error')
            }
        )

    }

    const employeeRequest = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'new_employee';
        let data = {
            access_code: cookies.token,
            Name: name,
            Job_Title: JobTitle
        }
        console.log(name)
        console.log(JobTitle)
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                console.log('KHDKGFPGDKGFDFKGH')
                setLoad(load+1)
                //setState('using')
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
            <div className="VsaStr">

                {MyTitle()}

                <div className="Form">
                    <h2>Введите данные нового сотрудника</h2>
                    <div className="Lol">
                        <h5>Введите имя</h5>
                        <input className='input' value={name} onChange={handleChangeName} placeholder="Имя работника"/>
                    </div>
                    <h5>Выберите должность</h5>
                    <div>
                        <input className="Answer" type="radio" value="Biologist" onChange={handleChangeJobTitle}/>
                        <b>Biologist</b>
                    </div>
                    <div>
                        <input className="Answer" type="radio" value="Stockman" onChange={handleChangeJobTitle}/>
                        <b>Stockman</b>
                    </div>
                    <div>
                        <input className="Answer" type="radio" value="Order Manager" onChange={handleChangeJobTitle}/>
                        <b>Order Manager</b>
                    </div>
                    <div>
                        <input className="Answer" type="radio" value="Many Jobs" onChange={handleChangeJobTitle}/>
                        <b>Many Jobs</b>
                    </div>
                    <div className="DivButton">
                        <button className='setbutton' onClick={employeeRequest}>Добавить</button>
                    </div>
                </div>

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
