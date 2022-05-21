//https://bootsnipp.com/snippets/vl4R7

import React, { useState } from 'react'
import './Login.css'
import configData from '../../config.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

export default function LoginForm(props: any) {

    const [user, setUser] = useState<string>();
    const [password, setPassword] = useState<string>();

    async function submitLogIn(e : any) {
        e?.preventDefault();

        console.log(`User: ${user} || Password: ${password}`);

        try{
            let response = await fetch(`${configData["API_URL"]}/login`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({user: user, password: password})
              });
            let data = await response.json();
        } catch (ex) {
            console.error(ex);
        }
    }

    return(
        <>
        <div className='login-form-container'>
        <div className="login-form">
            <div className="form-header">
                <div className="title">Login</div>
            </div> 
            <form onSubmit={submitLogIn} className="form-container px-5">
                <div className="form-element mt-5">
                    <label htmlFor="login-username">
                        <FontAwesomeIcon icon={faUser} />
                    </label>
                    <input type="text" id="login-username" onChange={(e) => setState(`user`, e.target.value)} placeholder="Username"/>
                </div>
                <div className="form-element mt-4">
                    <label htmlFor="login-password">
                        <FontAwesomeIcon icon={faKey} />
                    </label>
                    <input type="password" id="login-password" onChange={(e) => setState(`password`, e.target.value)} placeholder="Password"/>
                </div>
                <div className="form-element mt-5">
                    <input className="px-3 bg-light" type="submit" value="Login" />
                </div>
                {/* <div className="form-element forgot-link">
                    <a href="#">Forgot password?</a>
                </div> */}
            </form>
        </div>
        </div>
        </>
    );

    function setState(varname : any, value : any){
        if(value != null)
            eval(`set${capitalizeFirstLetter(varname)}("${value}")`);
    }

    function capitalizeFirstLetter(string : any) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      }
      
}