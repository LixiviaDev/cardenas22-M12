import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import ChapterNav from '../Chapters/ChapterNav';
import './ReaderInterface.css'

export default function ReaderInterface(props: any) {
    const {mangaId, mangaServerId, chapterId} = useParams();

    const [headerDisplay, setHeaderDisplay] = useState("");

    const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout>();

    function toggleFade(){
        if(tapTimeout == undefined){
            setTapTimeout(
                setTimeout(() => {
                    if(headerDisplay == "")
                        setHeaderDisplay("hide");
                    else    
                        setHeaderDisplay("");

                    setTapTimeout(undefined);
                }, 300)
            )
        }
        else {
            clearTimeout(tapTimeout);
            setTapTimeout(undefined);
        }
    }

    return(
        <>
        <header className={`readerInterface ${headerDisplay}`}>
            <div className='position-fixed w-100'>
                <ChapterNav  mangaId={mangaId} mangaServerId={mangaServerId} currentChapterId={chapterId}/>
            </div>

            <div className='position-fixed bottom-0 w-100'>
                <button 
                    type="button" 
                    className="btn btn-primary rounded-circle position-fixed d-flex justify-content-center align-items-center" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    style={{bottom: "20px", right: "20px"}}>
                    
                    <div>+</div>
                </button>

                <div className="collapse navbar-collapse bg-light text-center" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item py-2 border-bottom">
                        <a className="nav-link" href={`/info/${mangaId}`}>Info</a>
                    </li>
                    <li className="nav-item py-2 border-bottom">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <p className="nav-link h1 disabled" tabIndex={-1} aria-disabled="true" style={{height: "60px"}}>Menu</p>
                    </li>
                </ul>
                </div>
            </div>
        </header>

        <main onClick={toggleFade} className='d-flex flex-column'>
            {props.children}
        </main>

        <footer>
            <ChapterNav  mangaId={mangaId} mangaServerId={mangaServerId} currentChapterId={chapterId}/>
        </footer>
        </>
    );
}