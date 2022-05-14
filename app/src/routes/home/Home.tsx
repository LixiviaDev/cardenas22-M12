import React from 'react'
import { Link } from "react-router-dom";
import SectionTitle from '../../WebComponents/Common/SectionTitle';
import SharedInterface from '../../WebComponents/SharedInterface/SharedInterface';

export default function Home(props: any) {
    return(
        <>
        <SharedInterface>
            <h1 hidden>Home</h1>
            {/* <Link to="/login">Login</Link> */}
            <SectionTitle title="Seguir leyendo" href="/leyendo" />
            <SectionTitle title="Mas leido" href="/hot" />
            <SectionTitle title="Ultimas actualizaciones" href="/new" />
        </SharedInterface>
        </>
    );
}