import SharedInterface from "../../WebComponents/SharedInterface/SharedInterface";
import { LanguageManager } from '../../TypeScript/Managers/LanguageManager';
import configData from '../../config.json';
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function AdminPanel(props: any) {
    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    return(<>
        <h1 hidden>{languageManager.get("AdminPanel.TITLE")}</h1>
        <SharedInterface>
            <div className="row mx-3 mt-2 infoPage p-3">
                <nav className="d-none d-lg-block col-lg-3 col-xl-2 p-3 bg-white border border-secondary d-flex flex-column align-items-center position-relative">
                    <ul className="list-group">
                        <li className="list-group-item" style={{borderRadius: 0}}>
                            <a href="/adminPanel" className="text-black">{languageManager.get("AdminPanel.NAV.MANAGE_USERS")}</a>
                        </li>
                    </ul>
                </nav>
                <div className="col-12 col-lg-9 col-xl-10 p-0 pt-3 pt-lg-0 ps-lg-3">
                    <div className="w-100 h-100 row px-2 m-0 border border-secondary d-flex flex-column align-items-center chapterList">
                        <div className="row bg-transparent">
                            <div className="col-12 col-md-10 col-sm-8 m-auto h-100 bg-white">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SharedInterface>
    </>);
}