//https://bootsnipp.com/snippets/vl4R7

import React, { useState } from 'react'
import './Login.css'
import configData from '../../config.json';

var AES = require("crypto-js/aes");

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
                <div className="user-logo">
                </div>
                <div className="title">Login</div>
            </div> 
            <form onSubmit={submitLogIn} className="form-container">
                <div className="form-element">
                    <label className="fa fa-user" htmlFor="login-username"></label>
                    <input type="text" id="login-username" onChange={(e) => setState(`user`, e.target.value)} placeholder="Username"/>
                </div>
                <div className="form-element">
                    <label className="fa fa-key" htmlFor="login-password"></label>
                    <input type="password" id="login-password" onChange={(e) => setState(`password`, e.target.value)} placeholder="Password"/>
                </div>
                <div className="form-element">
                    <input type="submit" value="Login" />
                </div>
                <div className="form-element forgot-link">
                    <a href="#">Forgot password?</a>
                </div>
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