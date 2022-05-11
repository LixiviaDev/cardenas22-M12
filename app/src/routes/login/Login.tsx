import React from 'react'
import SharedInterface from '../../WebComponents/sharedInterface/SharedInterface';
import LoginForm from '../../WebComponents/Login/LoginForm';

export default function Login(props: any) {
    return(
        <>
        <SharedInterface>
            <LoginForm />
        </SharedInterface>
        </>
    );
}