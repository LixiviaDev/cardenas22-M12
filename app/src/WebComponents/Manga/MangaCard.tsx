import { useState } from "react";
import './MangaCard.css';

export function HoverMangaCard(props: any) {
    const [title] = useState(props.title);
    const [link] = useState(props.href);
    const [hoverDisabled] = useState(props.hoverDisabled ?? false);

    return(<>
        <a href={link} className={`hoverMangaCard ${hoverDisabled ? "" : "hover"}`}>
            <div hidden>Click aqui para ver la informacion de {title}</div>
            <img src="https://i.pinimg.com/originals/ca/c9/16/cac916910b6e44c8b4a8642c26d6e893.jpg" alt={`portada de ${title}`} />
            <div>{title}</div>
        </a>
    </>);
}