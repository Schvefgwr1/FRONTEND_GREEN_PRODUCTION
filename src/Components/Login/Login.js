import React, {useState} from "react";
import "./../CSS/Login.css";
import { Input } from 'antd';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from "axios";



export default function Login() {

    const navigate = useNavigate();
    const [login, setLogin]=useState();
    const [password, setPassword]=useState();
    const [state, setState]=useState('using');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const handleChangeLogin = event => {
        setLogin(event.target.value);
    };
    const handleChangePassword = event => {
        setPassword(event.target.value);
    };
    const loginRequest = async () => {
        setState('loading');
        let url = 'http://localhost:8000/api/' + 'user';
        let data = {
            login: login,
            password: password,
        }
        let headers = {
            headers:{
                'Accept': '*/*',
            }
        }
        const request = await axios.post(
            url,
            data,
        ).then(
            res => {
                setCookie('token', res.data.access_code);
                if(res.data.status==='root'){
                    navigate("/admin");
                } else if(res.data.status==='user'){
                    navigate("/home");

                }
            }
        ).catch(
            ()=>{
                console.log('error')
            }
        )
    }
    if(state==='using'){
        return(
            <div className='main-box'>
                <input className='' value={login} onChange={handleChangeLogin}/>
                <input className='' value={password} onChange={handleChangePassword}/>
                <button className='' onClick={loginRequest}/>
            </div>
        )
    } else if(state==='loading'){
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
