import React from 'react'
import SharedInterface from '../../WebComponents/SharedInterface/SharedInterface';
import SignupForm from '../../WebComponents/Signup/SignupForm';

export default function Signup(props: any) {
    return(
        <>
        <SharedInterface flexflow="row">
            <SignupForm />
        </SharedInterface>
        </>
    );
}