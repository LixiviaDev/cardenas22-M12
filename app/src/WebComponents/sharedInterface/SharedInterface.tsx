import React, { useState } from 'react'
import './SharedInterface.css'

export default function SharedInterface(props: any) {
    const [flexflow] = useState(props.flexflow ?? "column");

    return(
        <>
        <header className="sharedInterface">
        <nav className="navbar navbar-light bg-light">
            <div className="w-100">
                <div className='row container-fluid justify-space-beetwen m-0'>
                    <button className="navbar-toggler col-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <form className="d-flex col-8">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    </form>
                    {localStorage.getItem("token") == null ? 
                    <a className='p-0 col-2 text-center btn btn-light border border-dark d-flex justify-content-center align-items-center' href="/login">
                        <p className='m-0 fw-bold'>Log in</p>
                    </a>
                    :
                    <a className='p-0 col-2 text-center' href="/login">
                        <img src="https://i.pinimg.com/originals/d7/38/9b/d7389ba6dadf70ff848a9804be09ac30.jpg" className="rounded-circle profilePicture" alt="foto de perfil"/>
                    </a>
                    }
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
                    </li>
                </ul>
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