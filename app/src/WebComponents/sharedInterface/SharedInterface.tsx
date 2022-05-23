import React, { useState } from 'react'
import './SharedInterface.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { LanguageManager } from '../../TypeScript/Managers/LanguageManager';

export default function SharedInterface(props: any) {
    const [flexflow] = useState(props.flexflow ?? "column");
    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    return(
        <>
        <header className="sharedInterface">
        <nav className="navbar navbar-light bg-light">
            <div className="w-100">
                <div className='w-100 d-flex justify-content-between m-0 px-2'>
                    <div className='d-flex justify-content-center align-items-center' style={{width: "40px"}}>
                        <a className='text-black fs-3' href="/">
                            <FontAwesomeIcon icon={faHome} />
                        </a>
                    </div>
                    <div className='d-flex'>
                        <form className="d-flex" action='/search' method='get'>
                            <input className="form-control me-2" type="search" placeholder={languageManager.get("Shared.SEARCH")} name='search' aria-label="Search"/>
                        </form>
                        {localStorage.getItem("token") == null ? 
                        <a className='p-0 px-2 text-center btn btn-light border border-dark d-flex justify-content-center align-items-center' style={{borderRadius: "0"}} href="/login">
                            <p className='m-0 fw-bold'>Log in</p>
                        </a>
                        :
                        <a className='p-0 text-center' href="/login">
                            <img src="https://i.pinimg.com/originals/d7/38/9b/d7389ba6dadf70ff848a9804be09ac30.jpg" className="rounded-circle profilePicture" alt="foto de perfil"/>
                        </a>
                        }
                    </div>
                </div>
            </div>
        </nav>
        </header>

        <main className={`sharedInterface flex-${flexflow}`} style={{minHeight: window.innerHeight}}>
            {props.children}
        </main>

        <footer className="sharedInterface bg-light py-2 d-flex justify-content-center align-items-center">
            <p className='fw-bold' style={{fontSize: "xxx-large"}}>FOOTER</p>
        </footer>
        </>
    );
}