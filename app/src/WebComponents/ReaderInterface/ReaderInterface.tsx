import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import ChapterNav from '../Chapters/ChapterNav';

export default function ReaderInterface(props: any) {
    const {mangaId, mangaServerId, chapterId} = useParams();

    return(
        <>
        <header className='position-fixed w-100'>
            <ChapterNav  mangaId={mangaId} mangaServerId={mangaServerId} currentChapterId={chapterId}/>
        </header>

        <main className='d-flex flex-column'>
            {props.children}
        </main>

        <footer>
            <ChapterNav  mangaId={mangaId} mangaServerId={mangaServerId} currentChapterId={chapterId}/>
        </footer>
        </>
    );
}