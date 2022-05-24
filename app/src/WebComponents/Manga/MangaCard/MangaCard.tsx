import { useState } from "react";
import './MangaCard.css';
import { LanguageManager } from "../../../TypeScript/Managers/LanguageManager";

export function HoverMangaCard(props: any) {
    const [title] = useState(props.title);
    const [img] = useState(props.img);
    const [link] = useState(props.href);
    const [hoverDisabled] = useState(props.hoverDisabled ?? false);

    return(<>
        <a href={link} className={`mangaCard ${hoverDisabled ? "" : "hover"} w-100`}>
            <div hidden>Click aqui para ver la informacion de {title}</div>
            <div className="bg-white position-relative">
                <img src={img} 
                    className="w-100"
                    style={{boxShadow: "3px 3px 9px #0000005e"}}
                    alt={`portada de ${title}`} />
                <div className="mangaName position-absolute bottom-0 w-100 bg-white">
                    <div className="w-100 h-100 p-2">
                        <div className="w-100 h-100 d-flex justify-content-center align-items-cente border-dark" style={{border: "2px solid", minHeight: "60px"}}>
                            <div className="text-dark text-center m-auto p-2">{title}</div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </>);
}

export function SimpleMangaCard(props: any) {
    const [title] = useState(props.title);
    const [img] = useState(props.img);
    const [link] = useState(props.href);

    return(<>
        <a href={link} className={`mangaCard w-100`}>
            <div hidden>Click aqui para ver la informacion de {title}</div>
            <div className="bg-white">
                <img src={img} 
                    className="w-100"
                    alt={`portada de ${title}`} />
                <div className="mangaName bottom-0 w-100 bg-white">
                    <div className="w-100 h-100 p-2">
                        <div className="w-100 h-100 d-flex justify-content-center align-items-cente border-dark" style={{border: "2px solid", minHeight: "60px"}}>
                            <div className="text-dark text-center m-auto p-2">{title}</div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </>);
}

export function BriefInfoMangaCard(props: any){
    const [mangaId] = useState(props.mangaId);
    const [mangaServerId] = useState(props.mangaServerId);
    const [title] = useState(props.title);
    const [img] = useState(props.img);
    const [sinopsis] = useState<string>(props.sinopsis);
    const [statusId] = useState<string>(props.statusId);
    const [lastChapter] = useState<string>(props.lastChapter);
    const [lastChapterDateAdded] = useState<string>(props.lastChapterDateAdded);

    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    return(<>
        <a href={`/info/${mangaId}`} className="w-100 h-100 bg-white border border-dark briefInfoMangaCard">
            <div className="bg-white h-100">
                <div hidden>Click aqui para ver la informacion de {title}</div>
                <div className="d-flex h-100">
                    <img className="d-block d-sm-none m-auto ms-2 border border-dark" style={{width: "120px", height: "160px"}} src={img} alt="a" />
                    <img className="d-none d-sm-block h-100" src={img} alt="a" style={{aspectRatio:"1/1.5"}}/>
                    <div className="w-100 h-100 p-2 d-flex flex-column text-black">
                        <div className="sectionTitle bg-black text-white p-2">
                            <h2 className="m-0" style={{fontSize: "1.20rem"}}>{title}</h2>
                        </div>
                        <a className="w-100 py-2 ps-1 pe-2 text-dark d-flex justify-content-between grayBorderBottom" href={`/read/${mangaServerId}/${mangaId}/${lastChapter}`} style={{fontSize: "small"}}>
                            <p className="m-0">Ch. {lastChapter}</p>
                            <p className="m-0">{languageManager.dateToShortLangString(lastChapterDateAdded)}</p>
                            <p className="m-0 d-none d-sm-block">{statusId}</p>
                        </a>
                        <div className="h-100 m-0 p-2 ps-0 text-truncate text-wrap" style={{maxHeight: "9em"}}>
                            <p  className="fw-bold m-0 pb-1" 
                                style={{fontSize: "16px", lineHeight: "normal"}}>
                                    Sinopsis:
                            </p>
                            <p  style={{fontSize: "14px", lineHeight: "normal"}}
                                dangerouslySetInnerHTML={{__html: sinopsis}}></p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </>);
}