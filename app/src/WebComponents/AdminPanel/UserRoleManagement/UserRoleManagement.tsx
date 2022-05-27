import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { LanguageManager } from '../../../TypeScript/Managers/LanguageManager';
import UserCard from "../../Users/UserCard/UserCard";
import configData from '../../../config.json';
import { IUserBriefData, UserBriefData } from "../../../TypeScript/Classes/Users/UserData";
import { Role } from "../../../TypeScript/Classes/Roles/Role";

export default function UserRoleManagement() {
    const {userId} = useParams(); 
    
    const [userData, setUserData] = useState<UserBriefData>();
    const [userCard, setUserCard] = useState<JSX.Element>();

    const [allRoles, setAllRoles] = useState<Role[]>([]);
    const [userRoles, setUserRoles] = useState<Role[]>();

    const [tableContent, setTableContent] = useState<JSX.Element[]>();

    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());
    
    useEffect(() => componentDidMount(), []);

    useEffect(() => {
        if(userData?.userId != null)
            setUserCard(<UserCard   userId={userData?.userId}
                                    username={userData?.username} 
                                    img={userData?.img}
                                    dateAdded={userData?.dateAdded} />);
    }, [userData]);

    useEffect(() => {
        if(allRoles.length > 0 && userRoles != null)
            generateTableContent();
    }, [allRoles, userRoles]);
    
    function componentDidMount() {
        getUserData();
    }

    async function getUserData(){
        setUserData(await fetchUser());
        setAllRoles(await fetchAllRoles());
        setUserRoles(await fetchUserRoles());
    }

    function generateTableContent() {
        let newTableContent : JSX.Element[] = [];

        for(let role of allRoles){
            newTableContent.push(<>
                <tr>
                <td>{role.name}</td>
                <td>
                <input className="form-check-input" type="checkbox" value={role.roleId} defaultChecked={userRoles?.some(x => x.roleId === role.roleId)} onChange={onRoleToggled} />
                </td>
                </tr>
            </>);
        }

        setTableContent(newTableContent);
    }

    function onRoleToggled(e: any) {
        let bodyData = {token: localStorage.getItem("token"),
                        roleId: e.target.value,
                        userId: userId}

        let body = {
                        method: 'POST',
                        mode: "cors" as RequestMode,
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(bodyData)
                    };

        if(e.target.checked){
            fetch(`${configData.API_URL}/${configData.ENDPOINTS.ADD_USER_ROLE}`, body);
        } else{
            fetch(`${configData.API_URL}/${configData.ENDPOINTS.REMOVE_USER_ROLE}`, body);
        }

        console.log(e.target.checked);
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

    async function fetchAllRoles() : Promise<Role[]>{
        let usersData : Role[] = [];

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
            let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.GET_ALL_ROLES}`, body);

            usersData = await res.json();
        }
        catch(ex)
        {
            console.error(ex);
        }

        return usersData;
    }

    async function fetchUserRoles() : Promise<Role[]>{
        let usersData : Role[] = [];

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
            let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.GET_USER_ROLES}`, body);

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
                    <th scope="col">Rol</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
                </table>
            </div>
        </div>
    </>)
}