import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { LanguageManager } from '../../../TypeScript/Managers/LanguageManager';
import UserCard from "../../Users/UserCard/UserCard";
import configData from '../../../config.json';
import { IUserBriefData, UserBriefData } from "../../../TypeScript/Classes/Users/UserData";

export default function UserRoleManagement() {
    const {userId} = useParams(); 
    
    const [userData, setUserData] = useState<UserBriefData>();
    const [userCard, setUserCard] = useState<JSX.Element>();

    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());
    
    useEffect(() => componentDidMount(), []);

    useEffect(() => {
        if(userData?.userId != null)
            setUserCard(<UserCard   userId={userData?.userId}
                                    username={userData?.username} 
                                    img={userData?.img}
                                    dateAdded={userData?.dateAdded} />);
    }, [userData]);
    
    function componentDidMount() {
        getUserData();
    }

    async function getUserData(){
        setUserData(await fetchUser());
    }

    async function fetchUser() : Promise<UserBriefData>{
        let usersData : UserBriefData = new UserBriefData({} as IUserBriefData);

        let bodyData = {token: localStorage.getItem("token"),
                        userId: userId}

        let body = {
            method: 'POST',
            mode: "cors" as RequestMode,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
        }
        try
        {
            let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.GET_ONE_USER}`, body);

            usersData = await res.json();
        }
        catch(ex)
        {
            console.error(ex);
        }

        return usersData;
    }

    

    return(<>
        <div className="row">
            <div className="col-12 w-100 d-flex flex-column align-items-center">
                <h1>{languageManager.get("AdminPanel.NAV.MANAGE_USERS")}</h1>
            </div>
            <div className="col-12 w-100 d-flex flex-column align-items-center">
                {userCard}
            </div>
            <div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>@mdo</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </>)
}