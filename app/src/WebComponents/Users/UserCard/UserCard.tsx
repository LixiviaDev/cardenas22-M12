import { useState } from "react";
import { LanguageManager } from "../../../TypeScript/Managers/LanguageManager";

export default function UserCard(props : any) {
    const [img] = useState<string>(props.img ?? "https://i.pinimg.com/originals/d7/38/9b/d7389ba6dadf70ff848a9804be09ac30.jpg");
    const [username] = useState<string>(props.username ?? "404 :c");
    const [userId] = useState<string>(props.userId ?? -1);
    const [dateAdded] = useState<string>(props.dateAdded ?? "1-1-1920");

    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    return(<>
        <a href={`/adminPanel/manageUsers/${userId}`} className="w-100 d-flex border border-dark text-dark" style={{height:"100px"}}>
            <img style={{width:"100px", height:"100px"}} 
                    src={img} 
                    alt={languageManager.get("UserCard.IMG_ALT")} />
            <div className="w-100 px-2 d-flex flex-column justify-content-between">
                <p className="m-0 fs-2">{username}</p>
                <div className="w-100 py-2 d-flex justify-content-between">
                    <p className="m-0">{"#" + userId}</p>
                    <p className="m-0">{languageManager.dateToShortLangString(dateAdded)}</p>
                </div>
            </div>
        </a>
    </>);
}