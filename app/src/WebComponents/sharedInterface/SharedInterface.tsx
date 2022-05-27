import React, { useEffect, useState } from 'react'
import './SharedInterface.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { LanguageManager } from '../../TypeScript/Managers/LanguageManager';
import configData from '../../config.json';

export default function SharedInterface(props: any) {
    const [flexflow] = useState(props.flexflow ?? "column");
    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => componentDidMount(), [])

    function componentDidMount() {
        isUserAdmin()
    }

    function logOut() {
        localStorage.removeItem("token");

        window.location.reload();
    }

    async function isUserAdmin() {
        let isAdmin = false;

        try
        {
            let bodyData = {
                token: localStorage.getItem("token")
            }

            let body = {
            method: 'POST',
            mode: "cors" as RequestMode,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
            }

            let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.IS_ADMIN}`, body);
            let data: any = await res.json();

            isAdmin = data?.isAdmin;
        }
        catch(ex)
        {
            console.error(ex);
        }

        setIsAdmin(isAdmin);
    }

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
                        <a className='p-0 px-2 text-center btn btn-light border border-dark d-flex justify-content-center align-items-center' style={{borderRadius: "0", fontSize: "12px"}} href="/login">
                            <p className='m-0 fw-bold'>{languageManager.get("Shared.LOG_IN")}</p>
                        </a>
                        :
                        <>
                        <div className="flex-shrink-0 dropdown">
                            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://i.pinimg.com/originals/d7/38/9b/d7389ba6dadf70ff848a9804be09ac30.jpg" alt="mdo" width="32" height="32" className="rounded-circle" style={{width:"40px", height:"40px"}}/>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end text-small shadow" aria-labelledby="dropdownUser2">
                                {isAdmin && <li><a className="dropdown-item" href="/adminPanel/manageUsers">{languageManager.get("Shared.ADMIN_PANEL")}</a></li>}
                                <li><button className="dropdown-item" onClick={logOut}>{languageManager.get("Shared.LOG_OUT")}</button></li>
                            </ul>
                        </div>
                        </>
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