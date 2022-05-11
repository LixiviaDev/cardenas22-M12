import React from 'react'
import SharedInterface from '../../WebComponents/sharedInterface/SharedInterface.tsx';
import LoginForm from '../../WebComponents/Login/LoginForm.tsx';

export default function Login(props: any) {
    return(
        <>
        <SharedInterface>
            <LoginForm />
        </SharedInterface>
        </>
    );
}