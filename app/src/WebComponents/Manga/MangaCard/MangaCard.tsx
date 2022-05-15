import { useState } from "react";
import './MangaCard.css';

export function HoverMangaCard(props: any) {
    const [title] = useState(props.title);
    const [img] = useState(props.img);
    const [link] = useState(props.href);
    const [hoverDisabled] = useState(props.hoverDisabled ?? false);

    return(<>
        <a href={link} className={`mangaCard ${hoverDisabled ? "" : "hover"} w-100`}>
            <div hidden>Click aqui para ver la informacion de {title}</div>
            <div className="bg-primary position-relative">
                <img src={img} 
                    className="w-100 p-2"
                    alt={`portada de ${title}`} />
                <div className="mangaName position-absolute bottom-0 bg-primary w-100"  style={{height: "75px"}}>
                    <div className="w-100 h-100 p-2">
                        <div className="w-100 h-100 border-secondary d-flex justify-content-center align-items-cente" style={{border: "5px solid"}}>
                            <div className="text-dark m-auto">{title}</div>
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
            <div className="bg-primary">
                <img src={img} 
                    className="w-100 p-2"
                    alt={`portada de ${title}`} />
                <div className="mangaName bottom-0 bg-primary w-100" style={{height: "75px"}}>
                    <div className="w-100 h-100 p-2">
                        <div className="w-100 h-100 border-secondary d-flex justify-content-center align-items-cente" style={{border: "5px solid"}}>
                            <div className="text-dark m-auto">{title}</div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </>);
}