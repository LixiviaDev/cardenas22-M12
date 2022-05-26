import { useState } from "react";
import { LanguageManager } from "../../../TypeScript/Managers/LanguageManager";

export default function UserCard(props : any) {
    const [img] = useState<string>(props.img ?? "https://i.pinimg.com/originals/d7/38/9b/d7389ba6dadf70ff848a9804be09ac30.jpg");
    const [username] = useState<string>(props.username ?? "404 :c");
    const [userId] = useState<string>("#" + props.userId ?? -1);
    const [dateAdded] = useState<string>(props.userId ?? "1-1-1920");

    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    return(<>
        <div className="w-100 d-flex">
            <div className="p-3" style={{width:"100px"}}>
                <img src={img} alt={languageManager.get("UserCard.IMG_ALT")} />
            </div>
            <div className="d-flex flex-column">
                <p>{username}</p>
                <p>{userId}</p>
                <p>{languageManager.dateToShortLangString(dateAdded)}</p>
            </div>
        </div>
    </>);
}