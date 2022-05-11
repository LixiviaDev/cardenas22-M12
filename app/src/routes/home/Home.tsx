import React from 'react'
import { Link } from "react-router-dom";
import SharedInterface from '../../WebComponents/sharedInterface/SharedInterface.tsx';

export default function Home(props: any) {
    return(
        <>
        <SharedInterface>
            <h1>Home</h1>
            <Link to="/login">Login</Link>
        </SharedInterface>
        </>
    );
}