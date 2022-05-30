import { InputHTMLAttributes, useEffect, useState } from 'react';
import { IUserBriefData, UserBriefData } from '../../../TypeScript/Classes/Users/UserData';
import { LanguageManager } from '../../../TypeScript/Managers/LanguageManager';
import UserCard from '../../Users/UserCard/UserCard';
import configData from '../../../config.json';

export default function UserList() {
    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    const [usersData, setUsersData] = useState<UserBriefData[]>([]);
    const [usersCards, setUsersCards] = useState<JSX.Element[]>([]);

    useEffect(() => componentDidMount(), []);

    useEffect(() => generateUserCards(), [usersData])

    function componentDidMount() {
        generateAllUsersData();
    }

    async function generateAllUsersData(){
        setUsersData(await fetchAllUsers());
    }

    async function fetchAllUsers(){
        let usersData : UserBriefData[] = [];

        let bodyData = {token: localStorage.getItem("token")}

        let body = {
            method: 'POST',
            mode: "cors" as RequestMode,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
        }
        try
        {
            let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.GET_ALL_USERS}`, body);

            usersData = await res.json();
        }
        catch(ex)
        {
            console.error(ex);
        }

        return usersData;
    }

    async function fetchUsers(search: string){
        let usersData : UserBriefData[] = [];

        let bodyData = {token: localStorage.getItem("token"),
                        search: search}

        let body = {
            method: 'POST',
            mode: "cors" as RequestMode,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
        }
        try
        {
            let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.SEARCH_USERS}`, body);

            usersData = await res.json();
        }
        catch(ex)
        {
            console.error(ex);
        }

        return usersData;
    }

    async function onSubmitForm(e: any) {
        e?.preventDefault();
        
        setUsersData([]);

        let input = e.target[0];

        setUsersData(await fetchUsers(input.value));
    }

    function generateUserCards() {
        let newUsersData : JSX.Element[] = [];

        for(let userData of usersData)
            newUsersData.push(<>
                <div className="col-12 col-lg-6 p-2 d-flex">
                    <UserCard   userId={userData.userId}
                                username={userData.username} 
                                img={userData.img}
                                dateAdded={userData.dateAdded} />
                </div>
            </>);
        
        setUsersCards(newUsersData);
    }

    return(<>
        <div className="d-flex flex-column">
            <div className="d-flex py-3 justify-content-around">
                <h2 className='fs-1 text-uppercase'>{languageManager.get("AdminPanel.NAV.MANAGE_USERS")}</h2>
            </div>
            <div className="d-flex py-3 justify-content-around">
                <form className="d-flex w-50" action="/" onSubmit={onSubmitForm} method='get'>
                    <input className="form-control me-2" type="search" title='search bar' placeholder={languageManager.get("Shared.SEARCH")} name='search' aria-label="Search"/>
                </form>
            </div>
            <div className='row'>
                {usersCards}
            </div>
        </div>
    </>)
}