//https://bootsnipp.com/snippets/vl4R7

import React, { DOMElement, useEffect, useState } from 'react'
import './Signup.css'
import configData from '../../config.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { LanguageManager } from '../../TypeScript/Managers/LanguageManager';
import { Languages } from '../../TypeScript/Enums/Language.enum';

export default function SignupForm(props: any) {

    const [email, _setEmail] = useState<string>("");
    const [user, _setUser] = useState<string>("");
    const [password, _setPassword] = useState<string>("");
    const [password2, _setPassword2] = useState<string>("");

    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    const [emailIconReference] = useState<React.RefObject<HTMLLabelElement>>(React.createRef());
    const [password2IconReference] = useState<React.RefObject<HTMLLabelElement>>(React.createRef());
    const [submitButtonReference] = useState<React.RefObject<HTMLInputElement>>(React.createRef());

    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false);

    useEffect(() => checkArePasswordsEqual(), [password, password2]);

    async function submitSignup(e : any) {
        e?.preventDefault();
        
        if(isValidPassword && isValidEmail){
            try{
                let response = await fetch(`${configData["API_URL"]}/signup`, {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email: email, user: user, password: password})
                  });
                
                if(response.status === 200 || response.status === 201){
                    let data = await response.json();
        
                    localStorage.setItem("token", data?.token);
        
                    window.location.assign("/");
                } else {
                    setSubmitAsInvalid(languageManager.get("Login.INVALID_EMAIL_OR_USERNAME"));
                }
            } catch (ex) {
                setSubmitAsInvalid(languageManager.get("Login.INVALID_EMAIL_OR_USERNAME"));
                console.error(ex);
            }
        } else {
            if(!isValidEmail)
                setSubmitAsInvalid(languageManager.get("Login.INVALID_EMAIL"));
            else if(!isValidPassword)
                setSubmitAsInvalid(languageManager.get("Login.INVALID_PASSWORD"));
        }
    }

    return(
        <>
        <div className='login-form-container'>
        <div className="signup-form login-form my-5">
            <div className="form-header">
                <div className="title">{languageManager.get("Shared.SIGNUP")}</div>
            </div> 
            <div className="w-100 px-5 mt-4 d-flex justify-content-around align-items-center">
                <button className='bg-light rounded-circle text-center fw-bold border-0 text-capitalize' 
                        style={{width: "39px", height: "39px"}}
                        onClick={() => languageManager.changeAppLanguage(Languages.ES)}>
                            {Languages.ES}
                </button>
                <button className='bg-light rounded-circle text-center fw-bold border-0 text-capitalize' 
                        style={{width: "39px", height: "39px"}}
                        onClick={() => languageManager.changeAppLanguage(Languages.EN)}>
                        {Languages.EN}
                </button>
                <button className='bg-light rounded-circle text-center fw-bold border-0 text-capitalize' 
                        style={{width: "39px", height: "39px"}}
                        onClick={() => languageManager.changeAppLanguage(Languages.CA)}>
                        {Languages.CA}
                </button>
            </div>
            <form onSubmit={submitSignup} className="form-container px-5" method='post'>
                <div className="form-element mt-4">
                    <label  ref={emailIconReference}
                            htmlFor="login-username">
                        <FontAwesomeIcon icon={faUser} />
                    </label>
                    <input type="email" id="login-username" onChange={(e) => setEmail(e.target.value)} placeholder={languageManager.get("Login.EMAIL")} required/>
                </div>
                <div className="form-element mt-4">
                    <label htmlFor="login-username">
                        <FontAwesomeIcon icon={faUser} />
                    </label>
                    <input type="text" id="login-username" onChange={(e) => setUser(e.target.value)} placeholder={languageManager.get("Login.USERNAME")} required/>
                </div>
                <div className="form-element mt-4">
                    <label htmlFor="login-password">
                        <FontAwesomeIcon icon={faKey} />
                    </label>
                    <input type="password" id="login-password" onChange={(e) => setPassword(e.target.value)} placeholder={languageManager.get("Login.PASSWORD")} required/>
                </div>
                <div className="form-element mt-4">
                    <label  ref={password2IconReference}
                            htmlFor="login-password">
                        <FontAwesomeIcon icon={faKey} />
                    </label>
                    <input  type="password" 
                            id="login-password" 
                            onChange={(e) => setPassword2(e.target.value)} 
                            placeholder={languageManager.get("Login.PASSWORD_VALIDATION")} required/>
                </div>
                <div className="form-element mt-5">
                    <input  ref={submitButtonReference} title='submit'
                            className="px-3 bg-light" 
                            type="submit" 
                            value={languageManager.get("Shared.SIGN_UP")} />
                </div>
            </form>
        </div>
        </div>
        </>
    );

    function onInputChanged(){
        resetSubmitStyle();
    }

    function setEmail(value: string) {
        onInputChanged();

        if(emailIconReference.current != null){
            resetEmailInputStyle();
            setIsValidEmail(false);
            
            if(value.match(`[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`) != null){
                emailIconReference.current.classList.add("validPassword");
                setIsValidEmail(true);
            }
            else
                emailIconReference.current.classList.add("invalidPassword");
        }

        _setEmail(value);
    }

    function resetEmailInputStyle(){
        if(emailIconReference.current != null){
            const emailInput : HTMLLabelElement = emailIconReference.current;

            emailInput.classList.remove("validPassword");
            emailInput.classList.remove("invalidPassword");
        }
    }

    function setUser(value: string) {
        onInputChanged();

        _setUser(value);
    }

    function setPassword(value: string) {
        onInputChanged();

        _setPassword(value);
    }

    function setPassword2(value: string) {
        onInputChanged();

        _setPassword2(value);
    }

    function checkArePasswordsEqual(){
        setIsValidPassword(false);

        if(isEmptyOrSpaces(password2))
            resetPassword2InputStyle();
        else if (password2 === password){
            setPassword2InputAsValid();
            setIsValidPassword(true);
        }
        else
            setPassword2InputAsInvalid();
    }

    function resetPassword2InputStyle(){
        if(password2IconReference.current != null){
            const password2Input : HTMLLabelElement = password2IconReference.current;
    
            password2Input.classList.remove("validPassword");
            password2Input.classList.remove("invalidPassword");
        }
    }

    function setPassword2InputAsValid(){
        if(password2IconReference.current != null){
            const password2Input : HTMLLabelElement = password2IconReference.current;

            resetPassword2InputStyle();

            password2Input.classList.add("validPassword");
        }
    }

    function setPassword2InputAsInvalid(){
        if(password2IconReference.current != null){
            const password2Input : HTMLLabelElement = password2IconReference.current;

            resetPassword2InputStyle();

            password2Input.classList.add("invalidPassword");
        }
    }

    function resetSubmitStyle(){
        if(submitButtonReference.current != null){
            const submitButton : HTMLInputElement = submitButtonReference.current;

            submitButton.classList.remove("invalidAction");
            submitButton.value = languageManager.get("Shared.LOG_IN");
        }
    }

    function setSubmitAsInvalid(errorMessage: string){
        if(submitButtonReference.current != null){
            const submitButton : HTMLInputElement = submitButtonReference.current;

            submitButton.classList.add("invalidAction");
            submitButton.value = errorMessage;
        }
    }

    function isEmptyOrSpaces(str: string){
        return str === null || str.match(/^ *$/) !== null;
    }
}